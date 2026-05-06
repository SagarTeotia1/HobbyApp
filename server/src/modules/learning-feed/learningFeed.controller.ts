import type { Request, Response } from 'express';
import { ApiResponse } from '../../shared/utils/ApiResponse';
import { ApiError } from '../../shared/utils/ApiError';
import { feedQuerySchema, cardInteractionSchema } from './learningFeed.validator';
import { learningFeedService } from './learningFeed.service';

export const learningFeedController = {
  async getFeed(req: Request, res: Response): Promise<Response> {
    if (!req.user) throw ApiError.unauthorized();
    const q = feedQuerySchema.parse(req.query);
    const data = await learningFeedService.getFeed(req.user.uuid, q);
    return ApiResponse.ok(res, data);
  },

  async recordInteraction(req: Request, res: Response): Promise<Response> {
    if (!req.user) throw ApiError.unauthorized();
    const payload = cardInteractionSchema.parse(req.body);
    await learningFeedService.recordInteraction(req.user.uuid, payload);
    return ApiResponse.noContent(res);
  },
};
