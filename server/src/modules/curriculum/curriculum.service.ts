import { env } from '../../config/env';
import { logger } from '../../shared/logger/winston';
import { ApiError } from '../../shared/utils/ApiError';
import type { CurriculumHobby, CurriculumVideo } from './curriculum.types';

let cachedData: CurriculumHobby[] | null = null;
let cacheExpiresAt = 0;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

function withThumb(v: Omit<CurriculumVideo, 'thumbnailUrl'> & { thumbnailUrl?: string }): CurriculumVideo {
  return {
    ...v,
    thumbnailUrl:
      v.thumbnailUrl ??
      (v.youtubeId ? `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg` : ''),
  };
}

async function load(): Promise<CurriculumHobby[]> {
  const now = Date.now();
  if (cachedData && now < cacheExpiresAt) return cachedData;

  if (!env.CURRICULUM_URL) {
    logger.warn('[curriculum] CURRICULUM_URL not set — returning empty curriculum');
    return [];
  }

  logger.info('[curriculum] Fetching from', env.CURRICULUM_URL);

  const res = await fetch(env.CURRICULUM_URL, { signal: AbortSignal.timeout(10_000) });
  if (!res.ok) throw new Error(`Cloudflare fetch failed: ${res.status} ${res.statusText}`);

  const raw = await res.json() as unknown;
  const arr: unknown[] = Array.isArray(raw) ? raw : (raw as { hobbies?: unknown[] }).hobbies ?? [];

  cachedData = (arr as CurriculumHobby[]).map((h) => ({
    ...h,
    topics: h.topics.map((t) => ({
      ...t,
      videos: t.videos.map(withThumb),
    })),
  }));
  cacheExpiresAt = now + CACHE_TTL_MS;

  logger.info(`[curriculum] Cached ${cachedData.length} hobbies`);
  return cachedData;
}

export const curriculumService = {
  async listHobbies() {
    const data = await load();
    return data.map(({ id, name, category, emoji, accentColor }) => ({
      id, name, category, emoji, accentColor,
    }));
  },

  async getHobby(hobbyId: string): Promise<CurriculumHobby> {
    const data = await load();
    const hobby = data.find((h) => h.id === hobbyId);
    if (!hobby) throw ApiError.notFound(`Hobby '${hobbyId}' not found`);
    return hobby;
  },

  async getTopic(hobbyId: string, topicId: string) {
    const hobby = await curriculumService.getHobby(hobbyId);
    const topic = hobby.topics.find((t) => t.id === topicId);
    if (!topic) throw ApiError.notFound(`Topic '${topicId}' not found`);
    return { topic, hobbyName: hobby.name };
  },

  invalidateCache() {
    cachedData = null;
    cacheExpiresAt = 0;
  },
};
