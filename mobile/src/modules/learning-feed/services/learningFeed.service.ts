import { apiClient, unwrap } from '../../../shared/services/api.client';
import type { ApiEnvelope } from '../../../shared/types/api.types';
import type { LearningCard, CardInteraction } from '../../../shared/types/card.types';

export interface FeedQuery {
  hobbyId: string;
  limit?: number;
  cursor?: string;
}

export interface FeedResponse {
  cards: LearningCard[];
  nextCursor: string | null;
}

export interface InteractionPayload {
  cardId: string;
  hobbyId: string;
  interaction: CardInteraction;
  responseTimeMs: number;
  sessionId: string;
}

export const learningFeedService = {
  async getFeed(q: FeedQuery): Promise<FeedResponse> {
    return unwrap(apiClient.get<ApiEnvelope<FeedResponse>>('/feed', { params: q }));
  },

  async recordInteraction(payload: InteractionPayload): Promise<void> {
    await apiClient.post('/feed/interaction', payload);
  },
};
