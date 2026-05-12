import type { Request, Response } from 'express';
import { ApiResponse } from '../../shared/utils/ApiResponse';
import { curriculumService } from './curriculum.service';

export const curriculumController = {
  async listHobbies(_req: Request, res: Response): Promise<Response> {
    const hobbies = await curriculumService.listHobbies();
    return ApiResponse.ok(res, { hobbies });
  },

  async getHobby(req: Request, res: Response): Promise<Response> {
    const hobby = await curriculumService.getHobby(String(req.params.hobbyId ?? ''));
    if (!hobby) return ApiResponse.error(res, 404, 'NOT_FOUND', 'Hobby not found');
    return ApiResponse.ok(res, { hobby });
  },

  async getTopic(req: Request, res: Response): Promise<Response> {
    const hobbyId = String(req.params.hobbyId ?? '');
    const topicId = String(req.params.topicId ?? '');
    const { topic, hobbyName } = await curriculumService.getTopic(hobbyId, topicId);
    if (!topic) {
      return ApiResponse.ok(res, { topic: { id: topicId, name: topicId, videos: [] }, hobbyName });
    }
    return ApiResponse.ok(res, { topic, hobbyName });
  },

  async invalidateCache(_req: Request, res: Response): Promise<Response> {
    curriculumService.invalidateCache();
    return ApiResponse.ok(res, { message: 'Cache cleared' });
  },
};
