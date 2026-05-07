export const CARD_TYPES = [
  'concept',
  'quiz',
  'memory_hook',
  'analogy',
  'mistake_fix',
  'boss_prep',
  'scenario',
  'recap',
] as const;

export type CardType = (typeof CARD_TYPES)[number];
