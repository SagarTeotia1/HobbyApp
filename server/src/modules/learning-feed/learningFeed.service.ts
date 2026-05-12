import type { FeedQueryInput, CardInteractionInput } from './learningFeed.validator';
import type { FeedResponse, SignalResponse } from './learningFeed.types';
import { cacheKeys, cacheTTL } from '../../shared/constants/cacheKeys';
import { redis } from '../../infrastructure/redis/upstash';
import { CardModel } from '../../models/Card.model';
import { CardInteractionModel } from '../../models/CardInteraction.model';
import { UserModel } from '../../models/User.model';
import { UserProgressModel } from '../../models/UserProgress.model';
import { HobbyModel } from '../../models/Hobby.model';
import { GAME_CONFIG } from '../../shared/constants/gameConfig';
import { aiService } from '../ai/ai.service';
import { ApiError } from '../../shared/utils/ApiError';
import { logger } from '../../shared/logger/winston';
import type { DifficultyLevel, LearningCard, LearningSignal } from '../../shared/types/common.types';
import { DifficultyEngine } from '../../engines/DifficultyEngine/DifficultyEngine';
import { LearningEngine } from '../../engines/LearningEngine/LearningEngine';

const PREFETCH_LOCK_TTL_SECONDS = 30;

async function hydrateRedisQueue(userId: string, hobbyId: string, desired: number): Promise<void> {
  const candidateCards = await CardModel.find({ generatedFor: userId, hobbyId })
    .sort({ createdAt: -1 })
    .limit(desired)
    .lean();
  if (candidateCards.length === 0) return;

  const key = cacheKeys.cardQueue(userId, hobbyId);
  const payloads = candidateCards.map((card) =>
    JSON.stringify({
      id: card._id.toString(),
      hobbyId: card.hobbyId,
      type: card.type,
      difficulty: card.difficulty,
      conceptId: card.conceptId,
      title: card.title,
      frontContent: card.frontContent,
      backContent: card.backContent,
      tags: card.tags,
      estimatedReadSeconds: card.estimatedReadSeconds,
      generatedAt: card.createdAt.toISOString(),
    }),
  );

  try {
    await redis.del(key);
    await redis.rpush(key, ...payloads);
    await redis.expire(key, cacheTTL.cardQueue);
  } catch (err) {
    logger.warn('[feed] Redis unavailable, card queue not hydrated', { err: err instanceof Error ? err.message : String(err) });
  }
}

async function seedImmediateFallbackCards(
  userId: string,
  hobbyId: string,
  count: number,
): Promise<LearningCard[]> {
  const hobby = await HobbyModel.findOne({ slug: hobbyId }).lean();
  const hobbyName = hobby?.name ?? hobbyId;
  const conceptId = `${hobbyId}_core_foundations`;

  const created = await CardModel.insertMany(
    Array.from({ length: count }).map((_, index) => ({
      hobbyId,
      type: 'concept',
      difficulty: 'beginner',
      conceptId,
      title: `${hobbyName} Starter Card ${index + 1}`,
      frontContent: `Learn ${hobbyName}: key idea #${index + 1}.`,
      backContent: `Apply ${hobbyName}: practical tip #${index + 1}.`,
      tags: [hobbyId, 'starter'],
      estimatedReadSeconds: 30,
      generatedFor: userId,
    })),
  );

  return created.map((card) => ({
    id: card._id.toString(),
    hobbyId: card.hobbyId,
    type: card.type,
    difficulty: card.difficulty as DifficultyLevel,
    conceptId: card.conceptId,
    title: card.title,
    frontContent: card.frontContent,
    backContent: card.backContent,
    tags: card.tags,
    estimatedReadSeconds: card.estimatedReadSeconds,
    generatedAt: (card.createdAt ?? new Date()).toISOString(),
  }));
}

// Replaces BullMQ worker — runs async without blocking the request.
// Any failure is logged but never surfaced to the caller.
async function generateAndStoreCards(
  userId: string,
  hobbyId: string,
  difficulty: DifficultyLevel,
  batchSize: number,
  conceptHints: string[],
): Promise<void> {
  const hobby = await HobbyModel.findOne({ slug: hobbyId }).lean();
  if (!hobby) {
    logger.warn('[prefetch] hobby not found', { hobbyId });
    return;
  }

  const conceptId = conceptHints[0] ?? `${hobbyId}_core_foundations`;

  let cards: Array<{
    hobbyId: string;
    type: string;
    difficulty: DifficultyLevel;
    conceptId: string;
    title: string;
    frontContent: string;
    backContent: string;
    tags: string[];
    estimatedReadSeconds: number;
    generatedAt: Date;
  }>;

  try {
    cards = await aiService.generateCards({
      hobby: hobby.name,
      hobbyId: hobby.slug,
      level: difficulty,
      conceptId,
      count: batchSize,
      previousCards: [],
      userWeaknesses: [],
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    logger.warn('[prefetch] AI generation failed, using fallback cards', { hobbyId, message });
    cards = Array.from({ length: batchSize }).map((_, i) => ({
      hobbyId: hobby.slug,
      type: 'concept',
      difficulty,
      conceptId,
      title: `${hobby.name} Micro Lesson ${i + 1}`,
      frontContent: `Core ${hobby.name} idea #${i + 1}.`,
      backContent: `Practical ${hobby.name} tip #${i + 1}.`,
      tags: [hobby.slug, 'fallback'],
      estimatedReadSeconds: 30,
      generatedAt: new Date(),
    }));
  }

  await CardModel.insertMany(cards.map((card) => ({ ...card, generatedFor: userId })));
  await hydrateRedisQueue(userId, hobbyId, batchSize);
}

function toSignal(userId: string, payload: CardInteractionInput): LearningSignal {
  return {
    userId,
    hobbyId: payload.hobbyId,
    cardId: payload.cardId,
    interaction: payload.interaction,
    responseTimeMs: payload.responseTimeMs,
    sessionId: payload.sessionId,
    timestamp: payload.timestamp ?? new Date().toISOString(),
  };
}

export const learningFeedService = {
  async getNextCards(userId: string, query: FeedQueryInput): Promise<FeedResponse> {
    const key = cacheKeys.cardQueue(userId, query.hobbyId);
    let rawCards: string[] = [];
    let redisAvailable = true;

    try {
      rawCards = await redis.lrange(key, 0, Math.max(query.limit - 1, 0));
    } catch (err) {
      logger.warn('[feed] Redis unavailable, skipping queue read', { err: err instanceof Error ? err.message : String(err) });
      redisAvailable = false;
    }

    if (rawCards.length === 0 && redisAvailable) {
      try {
        await hydrateRedisQueue(userId, query.hobbyId, Math.max(query.limit, GAME_CONFIG.PREFETCH.NEXT_BATCH_SIZE));
        rawCards = await redis.lrange(key, 0, Math.max(query.limit - 1, 0));
      } catch (err) {
        logger.warn('[feed] Redis hydration failed', { err: err instanceof Error ? err.message : String(err) });
        redisAvailable = false;
      }
    }

    let cards: LearningCard[] = rawCards.map((raw) => JSON.parse(raw) as LearningCard);
    if (cards.length === 0) {
      cards = await seedImmediateFallbackCards(userId, query.hobbyId, query.limit);
      if (redisAvailable) {
        try {
          await hydrateRedisQueue(userId, query.hobbyId, Math.max(query.limit, GAME_CONFIG.PREFETCH.NEXT_BATCH_SIZE));
        } catch (err) {
          logger.warn('[feed] Redis hydration after fallback failed', { err: err instanceof Error ? err.message : String(err) });
        }
      }
    }

    let remaining = 0;
    if (cards.length > 0 && redisAvailable) {
      try {
        await redis.ltrim(key, cards.length, -1);
        remaining = await redis.llen(key);
      } catch (err) {
        logger.warn('[feed] Redis trim/llen failed', { err: err instanceof Error ? err.message : String(err) });
      }
    }

    return { cards, hasMore: remaining > 0 || cards.length > 0 };
  },

  async recordSignal(userId: string, payload: CardInteractionInput): Promise<SignalResponse> {
    const signal = toSignal(userId, payload);
    await CardInteractionModel.create(signal);

    const user = await UserModel.findOne({ uuid: userId });
    if (!user) throw ApiError.notFound('User not found');

    const xpDelta =
      payload.interaction === 'understood' ? GAME_CONFIG.XP.CARD_UNDERSTOOD : GAME_CONFIG.XP.CARD_NEEDS_REVIEW;
    user.xp += xpDelta;
    user.level = Math.max(1, Math.floor(user.xp / GAME_CONFIG.LEVELS.XP_PER_LEVEL) + 1);
    await user.save();

    const progress = await UserProgressModel.findOneAndUpdate(
      { userId, hobbyId: payload.hobbyId },
      {
        $setOnInsert: {
          userId,
          hobbyId: payload.hobbyId,
          currentDifficulty: user.skillLevel,
        },
        $inc: {
          cardsSeen: 1,
          cardsUnderstood: payload.interaction === 'understood' ? 1 : 0,
        },
      },
      { upsert: true, new: true },
    );

    // Track mastered / weak concepts for adaptive card selection
    const card = await CardModel.findOne({ _id: payload.cardId }).lean();
    if (card) {
      if (payload.interaction === 'understood') {
        await UserProgressModel.updateOne(
          { userId, hobbyId: payload.hobbyId },
          { $addToSet: { masteredConcepts: card.conceptId } },
        );
      } else if (payload.interaction === 'needs_simpler') {
        await UserProgressModel.updateOne(
          { userId, hobbyId: payload.hobbyId },
          { $addToSet: { weakConcepts: card.conceptId } },
        );
      }
    }

    const adjustment = DifficultyEngine.adjust(
      {
        current: progress.currentDifficulty as DifficultyLevel,
        score: 0,
      },
      signal,
    );

    if (adjustment.changed || adjustment.next !== progress.currentDifficulty) {
      progress.currentDifficulty = adjustment.next;
      await progress.save();
    }

    return { xpDelta, newXPTotal: user.xp };
  },

  async triggerPrefetch(userId: string, hobbyId: string): Promise<void> {
    const lockKey = `prefetch:lock:${userId}:${hobbyId}`;
    let canProceed = true;
    try {
      const acquired = await redis.set(lockKey, '1', 'EX', PREFETCH_LOCK_TTL_SECONDS, 'NX');
      canProceed = acquired !== null;
    } catch (err) {
      logger.warn('[prefetch] Redis lock unavailable, proceeding without lock', { err: err instanceof Error ? err.message : String(err) });
    }
    if (!canProceed) return;

    const progress = await UserProgressModel.findOne({ userId, hobbyId }).lean();
    const suggestion = LearningEngine.pickNext({
      userId,
      hobbyId,
      currentDifficulty: (progress?.currentDifficulty as DifficultyLevel) ?? 'beginner',
      masteredConcepts: progress?.masteredConcepts ?? [],
      weakConcepts: progress?.weakConcepts ?? [],
    });

    // Fire-and-forget — does not block the HTTP response
    setImmediate(() => {
      void generateAndStoreCards(
        userId,
        hobbyId,
        suggestion.difficulty,
        GAME_CONFIG.PREFETCH.NEXT_BATCH_SIZE,
        [suggestion.conceptId],
      ).catch((err: unknown) => {
        logger.error('[prefetch] unexpected error', {
          err: err instanceof Error ? err.message : String(err),
        });
      });
    });
  },

  async simplifyCard(userId: string, hobbyId: string, cardId: string): Promise<string> {
    const [card, user, hobby] = await Promise.all([
      CardModel.findOne({ _id: cardId, hobbyId }).lean(),
      UserModel.findOne({ uuid: userId }).lean(),
      HobbyModel.findOne({ slug: hobbyId }).lean(),
    ]);
    if (!card) throw ApiError.notFound('Card not found');

    const simplified = await aiService.simplifyCard({
      hobby: hobby?.name ?? hobbyId,
      originalContent: card.frontContent,
      userLevel: (user?.skillLevel as DifficultyLevel) ?? 'beginner',
    });
    await CardModel.updateOne({ _id: cardId }, { $set: { simplifiedContent: simplified.simplifiedContent } });
    return simplified.simplifiedContent;
  },
};
