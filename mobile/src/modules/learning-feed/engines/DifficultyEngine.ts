import type { DifficultyLevel } from '../../../shared/types/card.types';

export interface DifficultySnapshot {
  level: DifficultyLevel;
  score: number;
}

const TIERS: DifficultyLevel[] = ['beginner', 'intermediate', 'advanced'];

export const DifficultyEngine = {
  init(level: DifficultyLevel = 'beginner'): DifficultySnapshot {
    return { level, score: 0 };
  },

  apply(state: DifficultySnapshot, delta: number): DifficultySnapshot {
    const score = state.score + delta;
    const idx = TIERS.indexOf(state.level);

    if (score >= 5 && idx < TIERS.length - 1) {
      return { level: TIERS[idx + 1], score: 0 };
    }
    if (score <= -5 && idx > 0) {
      return { level: TIERS[idx - 1], score: 0 };
    }
    return { ...state, score };
  },
};
