import type { Request, Response } from 'express';
import { ApiResponse } from '../../shared/utils/ApiResponse';
import { youtubeService } from './youtube.service';
import { youtubeVideosQuerySchema } from './youtube.validator';
import { env } from '../../config/env';
import { logger } from '../../shared/logger/winston';

export const youtubeController = {
  async getVideos(req: Request, res: Response): Promise<Response> {
    if (!env.YOUTUBE_API_KEY) {
      return ApiResponse.error(res, 503, 'YOUTUBE_NOT_CONFIGURED', 'YouTube API key not set');
    }

    const parsed = youtubeVideosQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      return ApiResponse.error(res, 400, 'VALIDATION_ERROR', 'Invalid query params', parsed.error.flatten());
    }

    try {
      const result = await youtubeService.getVideosForTopic(parsed.data);
      return ApiResponse.ok(res, result);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      logger.error(`[youtube] unhandled error in getVideos: ${msg}`);
      return ApiResponse.ok(res, { videos: [], query: '', cachedAt: new Date().toISOString() });
    }
  },
};
