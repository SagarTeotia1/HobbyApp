import type { DifficultyLevel, LearningSignal } from '../../shared/types/common.types';

export interface DifficultyState {
  current: DifficultyLevel;
  score: number;
}

export const DifficultyEngine = {
  adjust(_state: DifficultyState, _signal: LearningSignal): DifficultyState {
    throw new Error('DifficultyEngine.adjust not implemented');
  },
};
