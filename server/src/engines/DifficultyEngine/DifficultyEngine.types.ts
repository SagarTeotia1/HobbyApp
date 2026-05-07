import type { DifficultyLevel, LearningSignal } from '../../shared/types/common.types';

export interface DifficultyState {
  current: DifficultyLevel;
  score: number;
}

export interface DifficultyAdjustmentResult {
  previous: DifficultyLevel;
  next: DifficultyLevel;
  score: number;
  changed: boolean;
}

export type DifficultyAdjustFn = (
  state: DifficultyState,
  signal: LearningSignal,
) => DifficultyAdjustmentResult;
