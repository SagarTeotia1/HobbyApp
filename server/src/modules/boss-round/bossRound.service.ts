import { nanoid } from 'nanoid';
import { redis } from '../../infrastructure/redis/upstash';
import { cacheKeys, cacheTTL } from '../../shared/constants/cacheKeys';
import { GAME_CONFIG } from '../../shared/constants/gameConfig';
import { CardModel } from '../../models/Card.model';
import { UserModel } from '../../models/User.model';
import { UserProgressModel } from '../../models/UserProgress.model';
import { HobbyModel } from '../../models/Hobby.model';
import { BossRoundSessionModel } from '../../models/BossRoundSession.model';
import { aiService } from '../ai/ai.service';
import type {
  BossRoundStartResponse,
  BossRoundSubmitPayload,
  BossRoundResultResponse,
} from './bossRound.types';
import type { DifficultyLevel, BossQuestion } from '../../shared/types/common.types';

export const bossRoundService = {
  async start(userId: string, hobbyId: string): Promise<BossRoundStartResponse> {
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

    const questions = await aiService.generateBossRoundQuestions({
      hobby: hobbyName,
      hobbyId,
      level: difficulty,
      conceptIds: fallbackConcepts,
      count: GAME_CONFIG.BOSS_ROUND.TOTAL_QUESTIONS,
    });

    const sessionId = nanoid();
    await redis.set(
      cacheKeys.quizBoss(userId, sessionId),
      JSON.stringify(questions),
      'EX',
      cacheTTL.quizBoss,
    );

    return { sessionId, questions };
  },

  async submit(userId: string, payload: BossRoundSubmitPayload): Promise<BossRoundResultResponse> {
    const raw = await redis.get(cacheKeys.quizBoss(userId, payload.sessionId));
    let questions: BossQuestion[] = [];
    if (raw) {
      questions = JSON.parse(raw) as BossQuestion[];
    }

    const questionMap = new Map(questions.map((q) => [q.id, q]));
    let correctCount = 0;
    let wrongCount = 0;
    let xpGained = 0;
    let xpLost = 0;
    let combo = 0;
    let maxCombo = 0;

    for (const ans of payload.answers) {
      const q = questionMap.get(ans.questionId);
      if (!q) continue;

      if (ans.selectedIndex === q.correctIndex) {
        combo++;
        if (combo > maxCombo) maxCombo = combo;
        const multiplier =
          combo >= GAME_CONFIG.BOSS_ROUND.COMBO_THRESHOLD
            ? GAME_CONFIG.BOSS_ROUND.COMBO_MULTIPLIER
            : 1;
        xpGained += GAME_CONFIG.BOSS_ROUND.XP_PER_CORRECT * multiplier;
        correctCount++;
      } else {
        combo = 0;
        xpLost += GAME_CONFIG.BOSS_ROUND.XP_PENALTY_PER_WRONG;
        wrongCount++;
      }
    }

    const netXP = xpGained - xpLost;

    const user = await UserModel.findOne({ uuid: userId });
    if (user) {
      user.xp = Math.max(0, user.xp + netXP);
      user.level = Math.max(1, Math.floor(user.xp / GAME_CONFIG.LEVELS.XP_PER_LEVEL) + 1);
      await user.save();
    }

    await BossRoundSessionModel.create({
      userId,
      hobbyId: questions[0]?.hobbyId ?? '',
      correctCount,
      wrongCount,
      maxCombo,
      xpGained,
      xpLost,
      durationMs: payload.answers.reduce((sum, a) => sum + a.timeMs, 0),
    });

    await redis.del(cacheKeys.quizBoss(userId, payload.sessionId));

    return { correctCount, wrongCount, xpGained, xpLost, maxCombo };
  },
};
