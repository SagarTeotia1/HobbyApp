import type { LearningCard } from '../../shared/types/common.types';

export interface FeedQuery {
  hobbyId: string;
  limit?: number;
  cursor?: string;
}

export interface FeedResponse {
  cards: LearningCard[];
  hasMore: boolean;
}

export interface SignalResponse {
  xpDelta: number;
  newXPTotal: number;
}
