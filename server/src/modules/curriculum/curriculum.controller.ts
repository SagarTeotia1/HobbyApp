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
    return ApiResponse.ok(res, { hobby });
  },

  async getTopic(req: Request, res: Response): Promise<Response> {
    const hobbyId = String(req.params.hobbyId ?? '');
    const topicId = String(req.params.topicId ?? '');
    const { topic, hobbyName } = await curriculumService.getTopic(hobbyId, topicId);

    return ApiResponse.ok(res, { topic, hobbyName });
  },

  async invalidateCache(_req: Request, res: Response): Promise<Response> {
    curriculumService.invalidateCache();
    return ApiResponse.ok(res, { message: 'Cache cleared' });
  },
};
