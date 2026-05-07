import { nanoid } from 'nanoid';
import { redis } from '../../infrastructure/redis/upstash';
import { cacheKeys, cacheTTL } from '../../shared/constants/cacheKeys';
import { GAME_CONFIG } from '../../shared/constants/gameConfig';
import { CardModel } from '../../models/Card.model';
import { UserModel } from '../../models/User.model';
import { UserProgressModel } from '../../models/UserProgress.model';
import { HobbyModel } from '../../models/Hobby.model';
import { aiService } from '../ai/ai.service';
import type { SubmitSpeedRoundInput } from './speedRound.validator';
import type { SpeedRoundStartResponse, SpeedRoundResultResponse } from './speedRound.types';
import type { DifficultyLevel, QuizQuestion } from '../../shared/types/common.types';

export const speedRoundService = {
  async start(userId: string, hobbyId: string): Promise<SpeedRoundStartResponse> {
    const hobby = await HobbyModel.findOne({ slug: hobbyId }).lean();
    const hobbyName = hobby?.name ?? hobbyId;

    const progress = await UserProgressModel.findOne({ userId, hobbyId }).lean();
    const difficulty: DifficultyLevel =
      (progress?.currentDifficulty as DifficultyLevel | undefined) ?? 'beginner';

    const recentCards = await CardModel.find({ generatedFor: userId, hobbyId })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    const conceptIds = [...new Set(recentCards.map((c) => c.conceptId))].slice(0, 5);
    const fallbackConcepts = conceptIds.length > 0 ? conceptIds : [`${hobbyId}_basics`];

    const questions = await aiService.generateSpeedRoundQuestions({
      hobby: hobbyName,
      hobbyId,
      level: difficulty,
      conceptIds: fallbackConcepts,
      count: GAME_CONFIG.SPEED_ROUND.MAX_QUESTIONS,
    });

    const sessionId = nanoid();
    await redis.set(
      cacheKeys.quizSpeed(userId, sessionId),
      JSON.stringify(questions),
      'EX',
      cacheTTL.quizSpeed,
    );

    return {
      sessionId,
      questions,
      durationSeconds: GAME_CONFIG.SPEED_ROUND.DURATION_SECONDS,
    };
  },

  async submit(userId: string, payload: SubmitSpeedRoundInput): Promise<SpeedRoundResultResponse> {
    const raw = await redis.get(cacheKeys.quizSpeed(userId, payload.sessionId));
    let questions: QuizQuestion[] = [];
    if (raw) {
      questions = JSON.parse(raw) as QuizQuestion[];
    }

    const questionMap = new Map(questions.map((q) => [q.id, q]));
    let correctCount = 0;
    for (const ans of payload.answers) {
      const q = questionMap.get(ans.questionId);
      if (q && ans.selectedIndex === q.correctIndex) correctCount++;
    }

    const xpGained = correctCount * GAME_CONFIG.SPEED_ROUND.XP_PER_CORRECT;

    if (xpGained > 0) {
      const user = await UserModel.findOne({ uuid: userId });
      if (user) {
        user.xp += xpGained;
        user.level = Math.max(1, Math.floor(user.xp / GAME_CONFIG.LEVELS.XP_PER_LEVEL) + 1);
        await user.save();
      }
    }

    await redis.del(cacheKeys.quizSpeed(userId, payload.sessionId));

    return { correctCount, xpGained };
  },
};
