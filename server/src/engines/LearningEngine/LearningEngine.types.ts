import type { DifficultyLevel } from '../../shared/types/common.types';

export interface LearningEngineContext {
  userId: string;
  hobbyId: string;
  currentDifficulty: DifficultyLevel;
  masteredConcepts: string[];
  weakConcepts: string[];
}

export interface NextCardSuggestion {
  conceptId: string;
  reason: string;
  difficulty: DifficultyLevel;
}
