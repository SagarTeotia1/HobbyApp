import type { Request, Response } from 'express';
import { z } from 'zod';
import { ApiResponse } from '../../shared/utils/ApiResponse';
import { leaderboardService } from './leaderboard.service';

const querySchema = z.object({
  hobbyId: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50),
});

export const leaderboardController = {
  async get(req: Request, res: Response): Promise<Response> {
    const { hobbyId, limit } = querySchema.parse(req.query);
    const data = hobbyId
      ? await leaderboardService.getHobby(hobbyId, limit)
      : await leaderboardService.getGlobal(limit);
    return ApiResponse.ok(res, data);
  },
};
