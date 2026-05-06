import type { QuizQuestion, BossQuestion, DifficultyLevel } from '../../shared/types/common.types';

export interface QuizGenerationParams {
  hobbyId: string;
  conceptIds: string[];
  difficulty: DifficultyLevel;
  count: number;
}

export const QuizEngine = {
  buildSpeedRound(_params: QuizGenerationParams): QuizQuestion[] {
    throw new Error('QuizEngine.buildSpeedRound not implemented');
  },

  buildBossRound(_params: QuizGenerationParams): BossQuestion[] {
    throw new Error('QuizEngine.buildBossRound not implemented');
  },
};
