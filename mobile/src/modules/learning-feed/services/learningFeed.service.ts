import { apiClient, unwrap } from '../../../shared/services/api.client';
import type { ApiEnvelope } from '../../../shared/types/api.types';
import type { LearningCard, CardInteraction } from '../../../shared/types/card.types';
import type { FeedTopic } from '../types/feed.types';

export interface FeedQuery {
  hobbyId: string;
  sessionId: string;
  limit?: number;
}

export interface FeedResponse {
  cards: LearningCard[];
  hasMore: boolean;
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
    const response = await unwrap(apiClient.get<ApiEnvelope<FeedResponse>>('/feed/cards', { params: q }));
    const normalizedCards = response.cards.map((card) => ({
      ...card,
      // Accept both current and legacy payload shapes from backend/AI providers.
      title:
        card.title?.trim() ||
        (typeof (card as unknown as { name?: unknown }).name === 'string'
          ? (card as unknown as { name: string }).name.trim()
          : '') ||
        'Learning Card',
      frontContent:
        card.frontContent?.trim() ||
        (typeof (card as unknown as { content?: unknown }).content === 'string'
          ? (card as unknown as { content: string }).content.trim()
          : '') ||
        'Content is being prepared. Swipe to continue.',
      backContent:
        card.backContent?.trim() ||
        (typeof (card as unknown as { explanation?: unknown }).explanation === 'string'
          ? (card as unknown as { explanation: string }).explanation.trim()
          : '') ||
        card.frontContent?.trim() ||
        'More details will appear soon.',
      tags: Array.isArray(card.tags) ? card.tags : [],
    }));
    return { ...response, cards: normalizedCards };
  },

  async recordInteraction(payload: InteractionPayload): Promise<{ xpDelta: number; newXPTotal: number }> {
    return unwrap(apiClient.post<ApiEnvelope<{ xpDelta: number; newXPTotal: number }>>('/feed/signal', payload));
  },

  async getTopicVideos(hobbyId: string, topicId: string): Promise<FeedTopic> {
    const data = await unwrap(
      apiClient.get<ApiEnvelope<{ topic: FeedTopic; hobbyName: string }>>(
        `/curriculum/${hobbyId}/topics/${topicId}`,
      ),
    );
    return data.topic;
  },

  async simplifyCard(payload: { cardId: string; hobbyId: string }): Promise<string> {
    const response = await apiClient.post('/feed/simplify', payload, {
      headers: { Accept: 'text/event-stream' },
      responseType: 'text',
      transformResponse: [(data) => data],
    });

    const text = String(response.data ?? '');
    const matches = text.match(/"delta":"([^"]*)"/g) ?? [];
    return matches
      .map((entry) => entry.replace('"delta":"', '').replace('"', ''))
      .join('')
      .replace(/\\n/g, '\n');
  },
};
