import type { Request, Response } from 'express';
import { z } from 'zod';
import { ApiResponse } from '../../shared/utils/ApiResponse';
import { ApiError } from '../../shared/utils/ApiError';
import { progressService } from './progress.service';

const querySchema = z.object({ hobbyId: z.string().min(1) });

export const progressController = {
  async getSummary(req: Request, res: Response): Promise<Response> {
    if (!req.user) throw ApiError.unauthorized();
    const { hobbyId } = querySchema.parse(req.query);
    const data = await progressService.getSummary(req.user.uuid, hobbyId);
    return ApiResponse.ok(res, data);
  },
};
