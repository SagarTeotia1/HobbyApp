import type { LearningCard } from '../../../shared/types/card.types';

export type SwipeDirection = 'left' | 'right' | 'down';

export interface SwipeContext {
  card: LearningCard;
  direction: SwipeDirection;
  responseTimeMs: number;
}
