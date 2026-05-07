// Single source of truth for ALL game numbers.
// This file is mirrored EXACTLY in mobile/src/shared/constants/gameConfig.ts.

export const GAME_CONFIG = {
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
