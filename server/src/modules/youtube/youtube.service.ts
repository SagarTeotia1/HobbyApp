import { redis } from '../../infrastructure/redis/upstash';
import {
  searchYouTube,
  fetchEmbeddableVideos,
  parseDuration,
  pickThumbnail,
} from '../../infrastructure/youtube/youtube.client';
import { aiService } from '../ai/ai.service';
import { env } from '../../config/env';
import { logger } from '../../shared/logger/winston';
import { cacheKeys, cacheTTL } from '../../shared/constants/cacheKeys';
import type { YouTubeVideosQueryInput } from './youtube.validator';
import type { YouTubeVideo, YouTubeVideosResponse } from './youtube.types';

const MAX_VIDEOS = 5;
// Fetch more candidates so we have enough after filtering non-embeddable ones
const YT_FETCH_COUNT = 15;

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`[youtube] ${label} timed out after ${ms}ms`)), ms),
    ),
  ]);
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

function buildKeyInsight(description: string, topicName: string, hobbyName: string): string {
  const trimmed = description?.trim();
  if (trimmed && trimmed.length > 20) {
    return trimmed.length > 140 ? `${trimmed.slice(0, 137)}...` : trimmed;
  }
  return `Learn ${topicName} concepts in this ${hobbyName} tutorial.`;
}

export const youtubeService = {
  async getVideosForTopic(params: YouTubeVideosQueryInput): Promise<YouTubeVideosResponse> {
    const apiKey = env.YOUTUBE_API_KEY;
    if (!apiKey) throw new Error('YOUTUBE_API_KEY not configured');

    const cacheKey = cacheKeys.youtubeVideos(params.hobbyId, params.topicId, params.skillLevel);
    try {
      const cached = await redis.get(cacheKey);
      if (cached) {
        logger.info(`[youtube] cache hit: ${cacheKey}`);
        return JSON.parse(cached) as YouTubeVideosResponse;
      }
    } catch (err) {
      logger.warn('[youtube] Redis unavailable, skipping cache', { err: err instanceof Error ? err.message : String(err) });
    }

    logger.info(`[youtube] query gen: ${params.hobbyName} / ${params.topicName} / ${params.skillLevel}`);

    // AI generates search query (3s cap)
    const query = await withTimeout(
      aiService.generateYouTubeSearchQuery(params.hobbyName, params.topicName, params.skillLevel),
      3_000,
      'query-gen',
    ).catch(() => `${params.hobbyName} ${params.topicName} ${params.skillLevel} tutorial`);

    logger.info(`[youtube] search: "${query}"`);

    // Step 1: search — fetch more candidates to account for filtering
    let searchItems: Awaited<ReturnType<typeof searchYouTube>>;
    try {
      searchItems = await searchYouTube(query, apiKey, YT_FETCH_COUNT);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      logger.warn(`[youtube] search failed, returning empty: ${msg}`);
      return { videos: [], query, cachedAt: new Date().toISOString() };
    }
    if (searchItems.length === 0) {
      return { videos: [], query, cachedAt: new Date().toISOString() };
    }

    // Step 2: verify embeddability + get duration via Videos API
    const videoIds = searchItems.map((item) => item.id.videoId);
    let verified: Awaited<ReturnType<typeof fetchEmbeddableVideos>>;
    try {
      verified = await fetchEmbeddableVideos(videoIds, apiKey);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      logger.warn(`[youtube] embeddability check failed, returning empty: ${msg}`);
      return { videos: [], query, cachedAt: new Date().toISOString() };
    }

    // Filter out Shorts (< 90s) — belt-and-suspenders after videoDuration=medium param
    const horizontal = verified.filter((v) => parseDuration(v.contentDetails?.duration ?? 'PT0S') >= 90);
    logger.info(`[youtube] ${searchItems.length} search → ${verified.length} embeddable → ${horizontal.length} horizontal`);

    if (horizontal.length === 0) {
      return { videos: [], query, cachedAt: new Date().toISOString() };
    }

    // Build snippet lookup from search results for description/thumbnail
    const snippetMap = new Map(searchItems.map((item) => [item.id.videoId, item.snippet]));

    let videos: YouTubeVideo[];
    try {
      videos = horizontal.slice(0, MAX_VIDEOS).map((detail) => {
        const snippet = snippetMap.get(detail.id) ?? detail.snippet;
        return {
          id: `yt-${detail.id}`,
          title: decodeHtmlEntities(snippet?.title ?? ''),
          creator: decodeHtmlEntities(snippet?.channelTitle ?? ''),
          youtubeId: detail.id,
          thumbnailUrl: pickThumbnail({ snippet }),
          keyInsight: buildKeyInsight(snippet?.description ?? '', params.topicName, params.hobbyName),
          durationSeconds: parseDuration(detail.contentDetails?.duration ?? 'PT0S'),
        };
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      logger.warn(`[youtube] video mapping failed: ${msg}`);
      return { videos: [], query, cachedAt: new Date().toISOString() };
    }

    const result: YouTubeVideosResponse = { videos, query, cachedAt: new Date().toISOString() };
    try {
      await redis.set(cacheKey, JSON.stringify(result), 'EX', cacheTTL.youtubeVideos);
      logger.info(`[youtube] cached ${videos.length} embeddable videos for ${cacheKey}`);
    } catch {
      logger.warn('[youtube] Redis unavailable, result not cached');
    }

    return result;
  },

  async invalidateCache(hobbyId: string, topicId: string, skillLevel: string): Promise<void> {
    await redis.del(cacheKeys.youtubeVideos(hobbyId, topicId, skillLevel));
  },
};
