// Single source of truth for ALL game numbers.
// This file is mirrored EXACTLY in mobile/src/shared/constants/gameConfig.ts.
// If you edit one, edit the other. Never define these numbers anywhere else.

export const GAME_CONFIG = {
  CARDS_BEFORE_SPEED_ROUND: 3,
  CARDS_BEFORE_BOSS_ROUND: 3,

  SPEED_ROUND: {
    DURATION_SECONDS: 30,
    XP_PER_CORRECT: 10,
    MAX_QUESTIONS: 20,
  },

  BOSS_ROUND: {
    XP_PER_CORRECT: 10,
    XP_PENALTY_PER_WRONG: 15,
    TOTAL_QUESTIONS: 3,
    DURATION_SECONDS: 60,
    COMBO_THRESHOLD: 3,
    COMBO_MULTIPLIER: 2,
  },

  XP: {
    CARD_UNDERSTOOD: 5,
    CARD_NEEDS_REVIEW: 0,
    STREAK_BONUS_PER_DAY: 10,
  },

  PREFETCH: {
    NEXT_BATCH_SIZE: 10,
    TRIGGER_AT_REMAINING: 3,
  },

  LEVELS: {
    XP_PER_LEVEL: 500,
  },
} as const;

export type GameConfig = typeof GAME_CONFIG;
