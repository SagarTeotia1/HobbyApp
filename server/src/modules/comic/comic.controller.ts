import type { Request, Response } from 'express';
import { ApiResponse } from '../../shared/utils/ApiResponse';
import { comicService } from './comic.service';
import { comicPanelQuerySchema } from './comic.validator';

export const comicController = {
  async getPanel(req: Request, res: Response): Promise<Response> {
    const parsed = comicPanelQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      return ApiResponse.error(res, 400, 'VALIDATION_ERROR', 'Invalid query params', parsed.error.flatten());
    }

    const panel = await comicService.getPanel(parsed.data);
    return ApiResponse.ok(res, panel);
  },
};
