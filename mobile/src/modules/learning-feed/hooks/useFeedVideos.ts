import { useQuery } from '@tanstack/react-query';
import { youtubeService } from '../services/youtube.service';
import { getTopicById, getTopicByIndex, FALLBACK_VIDEOS } from '../../../shared/constants/curriculum';
import { queryKeys } from '../../../shared/constants/queryKeys';
import { aiService } from '../../ai/services/ai.service';
import type { FeedVideo } from '../types/feed.types';

type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

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
      } catch (e) {
        console.warn('[useFeedVideos] AI title generation failed for', video.videoUrl, e);
        return video;
      }
    }),
  );
}

export function useFeedVideos(
  hobbyId: string,
  topicId: string,
  stageIndex: number,
  hobbyName: string,
  topicName: string,
  skillLevel: SkillLevel,
) {
  return useQuery({
    queryKey: queryKeys.youtube.videos(hobbyId, topicId, skillLevel),
    queryFn: async (): Promise<FeedVideo[]> => {
      // 1. Try YouTube API (AI picks optimal search query server-side)
      try {
        const ytVideos = await youtubeService.getVideosForTopic({
          hobbyId,
          topicId,
          topicName,
          hobbyName,
          skillLevel,
        });
        if (ytVideos.length > 0) return ytVideos;
      } catch (err) {
        console.warn('[useFeedVideos] YouTube API failed, falling back to local:', err);
      }

      // 2. Local curriculum fallback with AI-generated titles for direct video URLs
      const topic = getTopicById(hobbyId, topicId) ?? getTopicByIndex(hobbyId, stageIndex);
      const rawVideos = topic?.videos ?? FALLBACK_VIDEOS;
      return resolveVideosWithAiTitles(hobbyId, rawVideos);
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: false,
  });
}
