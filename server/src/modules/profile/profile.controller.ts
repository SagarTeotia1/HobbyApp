import type { Request, Response } from 'express';
import { z } from 'zod';
import { ApiResponse } from '../../shared/utils/ApiResponse';
import { ApiError } from '../../shared/utils/ApiError';
import { profileService } from './profile.service';

const updateSchema = z.object({
  currentHobbyId: z.string().min(1).optional(),
  dailyTimeMinutes: z.number().int().min(5).max(120).optional(),
  skillLevel: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
});

export const profileController = {
  async getMine(req: Request, res: Response): Promise<Response> {
    if (!req.user) throw ApiError.unauthorized();
    const data = await profileService.getMine(req.user.uuid);
    if (!data) throw ApiError.notFound('Profile not found');
    return ApiResponse.ok(res, data);
  },

  async update(req: Request, res: Response): Promise<Response> {
    if (!req.user) throw ApiError.unauthorized();
    const payload = updateSchema.parse(req.body);
    const data = await profileService.update(req.user.uuid, payload);
    return ApiResponse.ok(res, data);
  },
};
