import type { CardInteraction, DifficultyLevel } from '../../shared/types/common.types';

export interface XPEvent {
  interaction: CardInteraction;
  isCorrect?: boolean;
  responseTimeMs?: number;
  comboCount: number;
}

export interface XPResult {
  base: number;
  multiplier: number;
  total: number;
  newCombo: number;
}

export interface LevelUpResult {
  previousLevel: number;
  newLevel: number;
  didLevelUp: boolean;
  totalXP: number;
}

export interface ProgressionState {
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string;
  currentDifficulty: DifficultyLevel;
}
