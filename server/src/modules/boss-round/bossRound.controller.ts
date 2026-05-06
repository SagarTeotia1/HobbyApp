import type { Request, Response } from 'express';
import { z } from 'zod';
import { ApiResponse } from '../../shared/utils/ApiResponse';
import { ApiError } from '../../shared/utils/ApiError';
import { bossRoundService } from './bossRound.service';

const startSchema = z.object({ hobbyId: z.string().min(1) });
const submitSchema = z.object({
  sessionId: z.string().min(1),
  answers: z.array(
    z.object({
      questionId: z.string().min(1),
      selectedIndex: z.number().int().min(0),
      timeMs: z.number().int().min(0),
    }),
  ),
});

export const bossRoundController = {
  async start(req: Request, res: Response): Promise<Response> {
    if (!req.user) throw ApiError.unauthorized();
    const { hobbyId } = startSchema.parse(req.body);
    const data = await bossRoundService.start(req.user.uuid, hobbyId);
    return ApiResponse.created(res, data);
  },

  async submit(req: Request, res: Response): Promise<Response> {
    if (!req.user) throw ApiError.unauthorized();
    const payload = submitSchema.parse(req.body);
    const data = await bossRoundService.submit(req.user.uuid, payload);
    return ApiResponse.ok(res, data);
  },
};
