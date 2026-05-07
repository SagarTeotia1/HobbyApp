import type { Request, Response } from 'express';
import { ApiResponse } from '../../shared/utils/ApiResponse';
import { ApiError } from '../../shared/utils/ApiError';
import { hobbiesService } from './hobbies.service';
import { createCustomHobbySchema, searchHobbiesSchema } from './hobbies.validator';

export const hobbiesController = {
  async list(req: Request, res: Response): Promise<Response> {
    const query = searchHobbiesSchema.parse(req.query);
    const data = query.q
      ? await hobbiesService.search(query.q, query.limit)
      : await hobbiesService.list(query.limit);
    return ApiResponse.ok(res, data);
  },

  async getBySlug(req: Request, res: Response): Promise<Response> {
    const slug = String(req.params.slug ?? '');
    const data = await hobbiesService.findBySlug(slug);
    if (!data) throw ApiError.notFound('Hobby not found');
    return ApiResponse.ok(res, data);
  },

  async createCustom(req: Request, res: Response): Promise<Response> {
    const body = createCustomHobbySchema.parse(req.body);
    const hobby = await hobbiesService.createCustom(body.name);
    return ApiResponse.created(res, { hobby });
  },
};
