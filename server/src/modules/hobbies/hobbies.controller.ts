import type { Request, Response } from 'express';
import { ApiResponse } from '../../shared/utils/ApiResponse';
import { ApiError } from '../../shared/utils/ApiError';
import { hobbiesService } from './hobbies.service';

export const hobbiesController = {
  async list(_req: Request, res: Response): Promise<Response> {
    const data = await hobbiesService.list();
    return ApiResponse.ok(res, data);
  },

  async getBySlug(req: Request, res: Response): Promise<Response> {
    const slug = String(req.params.slug ?? '');
    const data = await hobbiesService.findBySlug(slug);
    if (!data) throw ApiError.notFound('Hobby not found');
    return ApiResponse.ok(res, data);
  },
};
