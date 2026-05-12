import { apiClient, unwrap } from '../../../shared/services/api.client';
import type { ApiEnvelope } from '../../../shared/types/api.types';
import type { FeedVideo } from '../types/feed.types';

export interface YouTubeVideosParams {
  hobbyId: string;
  topicId: string;
  topicName: string;
  hobbyName: string;
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
}

interface YouTubeVideosData {
  videos: FeedVideo[];
  query: string;
  cachedAt: string;
}

export const youtubeService = {
  async getVideosForTopic(params: YouTubeVideosParams): Promise<FeedVideo[]> {
    const data = await unwrap(
      apiClient.get<ApiEnvelope<YouTubeVideosData>>('/youtube/videos', {
        params,
        timeout: 20_000, // server needs: AI query gen (3s) + YT search (10s) + embeddability check (10s)
      }),
    );
    return data.videos;
  },
};
