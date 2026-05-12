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
    youtubeId: (v as { youtubeId?: string }).youtubeId,
    videoUrl: (v as { videoUrl?: string }).videoUrl,
    thumbnailUrl:
      (v as { thumbnailUrl?: string }).thumbnailUrl ??
      ((v as { youtubeId?: string }).youtubeId
        ? `https://img.youtube.com/vi/${(v as { youtubeId?: string }).youtubeId}/hqdefault.jpg`
        : undefined),
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
      // 1. Try YouTube API (server-side: AI picks search query + embeddability filter)
      try {
        console.log('[useFeedVideos] Fetching from YouTube API...', { hobbyId, topicId, skillLevel });
        const ytVideos = await youtubeService.getVideosForTopic({
          hobbyId,
          topicId,
          topicName,
          hobbyName,
          skillLevel,
        });
        console.log(`[useFeedVideos] YouTube returned ${ytVideos.length} videos`);
        if (ytVideos.length > 0) return ytVideos;
        console.warn('[useFeedVideos] YouTube returned 0 videos, using curriculum fallback');
      } catch (err) {
        console.warn('[useFeedVideos] YouTube API call failed, falling back to curriculum:', err);
      }

      // 2. Local curriculum fallback — use the topic's own curated videos
      const topic = getTopicById(hobbyId, topicId) ?? getTopicByIndex(hobbyId, stageIndex);
      const rawVideos = topic?.videos ?? FALLBACK_VIDEOS;
      console.log(`[useFeedVideos] Using curriculum fallback: ${rawVideos.length} videos for topic "${topicName}"`);
      return resolveVideosWithAiTitles(hobbyId, rawVideos);
    },
    staleTime: 0,
    gcTime: 30 * 60 * 1000,
    retry: 1,
    retryDelay: 2000,
  });
}
