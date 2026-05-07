import type { Request, Response } from 'express';
import { ApiResponse } from '../../shared/utils/ApiResponse';
import { ApiError } from '../../shared/utils/ApiError';
import { speedRoundService } from './speedRound.service';
import { startSpeedRoundSchema, submitSpeedRoundSchema } from './speedRound.validator';

export const speedRoundController = {
  async start(req: Request, res: Response): Promise<Response> {
    if (!req.user) throw ApiError.unauthorized();
    const { hobbyId } = startSpeedRoundSchema.parse(req.body);
    const data = await speedRoundService.start(req.user.uuid, hobbyId);
    return ApiResponse.ok(res, data);
  },

  async submit(req: Request, res: Response): Promise<Response> {
    if (!req.user) throw ApiError.unauthorized();
    const payload = submitSpeedRoundSchema.parse(req.body);
    const data = await speedRoundService.submit(req.user.uuid, payload);
    return ApiResponse.ok(res, data);
  },
};
