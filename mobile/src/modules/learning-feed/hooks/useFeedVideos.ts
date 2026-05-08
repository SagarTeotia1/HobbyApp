import { useQuery } from '@tanstack/react-query';
import { learningFeedService } from '../services/learningFeed.service';
import { getTopicById, getTopicByIndex, FALLBACK_VIDEOS } from '../../../shared/constants/curriculum';
import { queryKeys } from '../../../shared/constants/queryKeys';
import { aiService } from '../../ai/services/ai.service';
import type { FeedVideo } from '../types/feed.types';

function curriculumVideosToFeed(videos: typeof FALLBACK_VIDEOS): FeedVideo[] {
  return videos.map((v) => ({
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

async function resolveVideosWithAiTitles(
  hobbyId: string,
  videos: typeof FALLBACK_VIDEOS,
): Promise<FeedVideo[]> {
  const base = curriculumVideosToFeed(videos);
  return Promise.all(
    base.map(async (video) => {
      if (!video.videoUrl || video.youtubeId) return video;
      try {
        const { title, creator } = await aiService.generateVideoTitle(hobbyId, video.videoUrl);
        return { ...video, title, creator };
      } catch {
        return video;
      }
    }),
  );
}

function resolveStaticVideos(hobbyId: string, topicId: string, stageIndex: number): FeedVideo[] {
  const topic = getTopicById(hobbyId, topicId) ?? getTopicByIndex(hobbyId, stageIndex);
  const videos = topic?.videos ?? FALLBACK_VIDEOS;
  return curriculumVideosToFeed(videos);
}

export function useFeedVideos(hobbyId: string, topicId: string, stageIndex: number) {
  return useQuery({
    queryKey: queryKeys.curriculum.topic(hobbyId, topicId),
    queryFn: async () => {
      try {
        return await learningFeedService.getTopicVideos(hobbyId, topicId);
      } catch {
        // No static curriculum videos for this hobby — use fallback with AI-generated titles
        const topic = getTopicById(hobbyId, topicId) ?? getTopicByIndex(hobbyId, stageIndex);
        if (!topic) {
          const videos = await resolveVideosWithAiTitles(hobbyId, FALLBACK_VIDEOS);
          return { id: topicId, name: '', videos };
        }
        const videos = await resolveVideosWithAiTitles(hobbyId, topic.videos);
        return { id: topicId, name: topic.name, videos };
      }
    },
    select: (data) => data.videos,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: false,
  });
}
