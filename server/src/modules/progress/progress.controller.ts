import type { Request, Response } from 'express';
import { z } from 'zod';
import { ApiResponse } from '../../shared/utils/ApiResponse';
import { ApiError } from '../../shared/utils/ApiError';
import { progressService } from './progress.service';

const summarySchema = z.object({ hobbyId: z.string().min(1) });
const sessionSchema = z.object({ sessionId: z.string().min(1) });
const dashboardSchema = z.object({ hobbyId: z.string().min(1) });

export const progressController = {
  async getSummary(req: Request, res: Response): Promise<Response> {
    if (!req.user) throw ApiError.unauthorized();
    const { hobbyId } = summarySchema.parse(req.query);
    const data = await progressService.getSummary(req.user.uuid, hobbyId);
    return ApiResponse.ok(res, data);
  },

  async getSession(req: Request, res: Response): Promise<Response> {
    if (!req.user) throw ApiError.unauthorized();
    const { sessionId } = sessionSchema.parse(req.query);
    const data = await progressService.getSessionSummary(req.user.uuid, sessionId);
    return ApiResponse.ok(res, data);
  },

  async getDashboard(req: Request, res: Response): Promise<Response> {
    if (!req.user) throw ApiError.unauthorized();
    const { hobbyId } = dashboardSchema.parse(req.query);
    const data = await progressService.getDashboardData(req.user.uuid, hobbyId);
    return ApiResponse.ok(res, data);
  },
};
