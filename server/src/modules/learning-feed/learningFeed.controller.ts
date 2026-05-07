import type { Request, Response } from 'express';
import { ApiResponse } from '../../shared/utils/ApiResponse';
import { ApiError } from '../../shared/utils/ApiError';
import { feedQuerySchema, cardInteractionSchema, simplifyCardSchema } from './learningFeed.validator';
import { learningFeedService } from './learningFeed.service';

export const learningFeedController = {
  async getCards(req: Request, res: Response): Promise<Response> {
    if (!req.user) throw ApiError.unauthorized();
    const q = feedQuerySchema.parse(req.query);
    const data = await learningFeedService.getNextCards(req.user.uuid, q);
    return ApiResponse.ok(res, data);
  },

  async recordSignal(req: Request, res: Response): Promise<Response> {
    if (!req.user) throw ApiError.unauthorized();
    const payload = cardInteractionSchema.parse(req.body);
    const data = await learningFeedService.recordSignal(req.user.uuid, payload);
    return ApiResponse.ok(res, data);
  },

  async simplify(req: Request, res: Response): Promise<void> {
    if (!req.user) throw ApiError.unauthorized();
    const body = simplifyCardSchema.parse(req.body);

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders?.();

    const content = await learningFeedService.simplifyCard(req.user.uuid, body.hobbyId, body.cardId);
    const chunkSize = 32;
    for (let i = 0; i < content.length; i += chunkSize) {
      const delta = content.slice(i, i + chunkSize);
      res.write(`data: ${JSON.stringify({ delta })}\n\n`);
    }
    res.write(`data: ${JSON.stringify({ delta: '', isComplete: true })}\n\n`);
    res.end();
  },
};
