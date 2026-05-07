import { useQuery } from '@tanstack/react-query';
import { learningFeedService } from '../services/learningFeed.service';
import { getTopicById } from '../../../shared/constants/curriculum';
import { queryKeys } from '../../../shared/constants/queryKeys';
import type { FeedVideo } from '../types/feed.types';

function staticFallback(hobbyId: string, topicId: string): FeedVideo[] {
  const topic = getTopicById(hobbyId, topicId);
  if (!topic) return [];
  return topic.videos.map((v) => ({
    id: v.id,
    title: v.title,
    creator: v.creator,
    youtubeId: v.youtubeId,
    videoUrl: v.videoUrl,
    thumbnailUrl:
      v.thumbnailUrl ??
      (v.youtubeId ? `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg` : ''),
    keyInsight: v.keyInsight,
  }));
}

export function useFeedVideos(hobbyId: string, topicId: string) {
  return useQuery({
    queryKey: queryKeys.curriculum.topic(hobbyId, topicId),
    queryFn: async () => {
      try {
        return await learningFeedService.getTopicVideos(hobbyId, topicId);
      } catch {
        return { id: topicId, name: '', videos: staticFallback(hobbyId, topicId) };
      }
    },
    select: (data) => data.videos,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: false,
  });
}
