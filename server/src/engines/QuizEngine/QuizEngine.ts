import type { QuizQuestion, DifficultyLevel } from '../../shared/types/common.types';

export interface QuizGenerationParams {
  hobbyId: string;
  conceptIds: string[];
  difficulty: DifficultyLevel;
  count: number;
}

export const QuizEngine = {
  buildQuiz(_params: QuizGenerationParams): QuizQuestion[] {
    throw new Error('QuizEngine.buildQuiz not implemented');
  },
};
