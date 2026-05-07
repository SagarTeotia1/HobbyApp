// Display labels / colors for each card type. Mirrors LearningCardType in card.types.ts.

export const CARD_TYPES = [
  'concept',
  'memory_hook',
  'analogy',
  'mistake_fix',
  'boss_prep',
  'scenario',
  'recap',
] as const;

export type CardType = (typeof CARD_TYPES)[number];
