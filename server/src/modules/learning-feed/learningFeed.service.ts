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
import { cardGenerationQueue } from '../../infrastructure/queue/cardGeneration.queue';
import { aiService } from '../ai/ai.service';
import { ApiError } from '../../shared/utils/ApiError';
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

  await redis.del(key);
  await redis.rpush(key, ...payloads);
  await redis.expire(key, cacheTTL.cardQueue);
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
    let rawCards = await redis.lrange(key, 0, Math.max(query.limit - 1, 0));
    if (rawCards.length === 0) {
      await hydrateRedisQueue(userId, query.hobbyId, Math.max(query.limit, GAME_CONFIG.PREFETCH.NEXT_BATCH_SIZE));
      rawCards = await redis.lrange(key, 0, Math.max(query.limit - 1, 0));
    }

    let cards: LearningCard[] = rawCards.map((raw) => JSON.parse(raw) as LearningCard);
    if (cards.length === 0) {
      cards = await seedImmediateFallbackCards(userId, query.hobbyId, query.limit);
      await hydrateRedisQueue(userId, query.hobbyId, Math.max(query.limit, GAME_CONFIG.PREFETCH.NEXT_BATCH_SIZE));
    }

    if (cards.length > 0) {
      await redis.ltrim(key, cards.length, -1);
    }

    const remaining = await redis.llen(key);

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
    const acquired = await redis.set(lockKey, '1', 'EX', PREFETCH_LOCK_TTL_SECONDS, 'NX');
    if (!acquired) return;

    const progress = await UserProgressModel.findOne({ userId, hobbyId }).lean();
    const suggestion = LearningEngine.pickNext({
      userId,
      hobbyId,
      currentDifficulty: (progress?.currentDifficulty as DifficultyLevel) ?? 'beginner',
      masteredConcepts: progress?.masteredConcepts ?? [],
      weakConcepts: progress?.weakConcepts ?? [],
    });

    await cardGenerationQueue.add('feed-prefetch', {
      userId,
      hobbyId,
      difficulty: suggestion.difficulty,
      batchSize: GAME_CONFIG.PREFETCH.NEXT_BATCH_SIZE,
      conceptHints: [suggestion.conceptId],
    }, {
      jobId: `prefetch:${userId}:${hobbyId}`,
      removeOnComplete: true,
      removeOnFail: { age: 60 * 10 },
    });
  },

  async simplifyCard(userId: string, hobbyId: string, cardId: string): Promise<string> {
    const card = await CardModel.findOne({ _id: cardId, hobbyId }).lean();
    if (!card) throw ApiError.notFound('Card not found');

    const simplified = await aiService.simplifyCard(userId, { cardId, hobbyId });
    await CardModel.updateOne({ _id: cardId }, { $set: { simplifiedContent: simplified.simplifiedContent } });
    return simplified.simplifiedContent;
  },
};
