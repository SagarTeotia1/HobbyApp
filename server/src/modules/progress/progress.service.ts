import { UserModel } from '../../models/User.model';
import { UserProgressModel } from '../../models/UserProgress.model';
import { CardInteractionModel } from '../../models/CardInteraction.model';
import { GAME_CONFIG } from '../../shared/constants/gameConfig';
import type { ProgressSummary, SessionSummary, DashboardData } from './progress.types';

export const progressService = {
  async getSummary(userId: string, hobbyId: string): Promise<ProgressSummary> {
    const [user, progress] = await Promise.all([
      UserModel.findOne({ uuid: userId }).lean(),
      UserProgressModel.findOne({ userId, hobbyId }).lean(),
    ]);

    return {
      xp: user?.xp ?? 0,
      level: user?.level ?? 1,
      streak: user?.streak ?? 0,
      cardsSeen: progress?.cardsSeen ?? 0,
      cardsUnderstood: progress?.cardsUnderstood ?? 0,
      weakConcepts: progress?.weakConcepts ?? [],
      masteredConcepts: progress?.masteredConcepts ?? [],
    };
  },

  async getSessionSummary(userId: string, sessionId: string): Promise<SessionSummary> {
    const [interactions, user] = await Promise.all([
      CardInteractionModel.find({ userId, sessionId }).lean(),
      UserModel.findOne({ uuid: userId }).lean(),
    ]);

    const hobbyId = user?.currentHobbyId ?? '';
    const progress = hobbyId
      ? await UserProgressModel.findOne({ userId, hobbyId }).lean()
      : null;

    const cardsSeen = interactions.length;
    const cardsUnderstood = interactions.filter((i) => i.interaction === 'understood').length;
    const cardsBookmarked = interactions.filter((i) => i.interaction === 'bookmarked').length;
    const xpGained = cardsUnderstood * GAME_CONFIG.XP.CARD_UNDERSTOOD;

    return {
      sessionId,
      xpGained,
      cardsSeen,
      cardsUnderstood,
      cardsBookmarked,
      weakTopics: progress?.weakConcepts ?? [],
      totalXP: user?.xp ?? 0,
      level: user?.level ?? 1,
      streak: user?.streak ?? 0,
      completedAt: new Date().toISOString(),
    };
  },

  async getDashboardData(userId: string, hobbyId: string): Promise<DashboardData> {
    const [user, progress] = await Promise.all([
      UserModel.findOne({ uuid: userId }).lean(),
      UserProgressModel.findOne({ userId, hobbyId }).lean(),
    ]);

    const xp = user?.xp ?? 0;
    const level = user?.level ?? 1;
    const xpInLevel = xp % GAME_CONFIG.LEVELS.XP_PER_LEVEL;
    const progressToNextLevel = xpInLevel / GAME_CONFIG.LEVELS.XP_PER_LEVEL;

    return {
      xp,
      level,
      streak: user?.streak ?? 0,
      progressToNextLevel,
      cardsSeen: progress?.cardsSeen ?? 0,
      cardsUnderstood: progress?.cardsUnderstood ?? 0,
      weakConcepts: progress?.weakConcepts ?? [],
      masteredConcepts: progress?.masteredConcepts ?? [],
      currentDifficulty: progress?.currentDifficulty ?? 'beginner',
    };
  },
};
