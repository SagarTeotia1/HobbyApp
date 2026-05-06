import type { FeedQueryInput, CardInteractionInput } from './learningFeed.validator';
import type { FeedResponse } from './learningFeed.types';

export const learningFeedService = {
  async getFeed(_userId: string, _q: FeedQueryInput): Promise<FeedResponse> {
    return { cards: [], nextCursor: null };
  },

  async recordInteraction(_userId: string, _payload: CardInteractionInput): Promise<void> {
    // TODO: persist + emit signal to DifficultyEngine
  },
};
