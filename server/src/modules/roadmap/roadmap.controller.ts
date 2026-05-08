import type { Request, Response } from 'express';
import { asyncHandler } from '../../shared/utils/asyncHandler';
import { ApiResponse } from '../../shared/utils/ApiResponse';
import { topicDetailBodySchema, learnGraphBodySchema } from './roadmap.validator';
import { roadmapService } from './roadmap.service';

export const getTopicDetail = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const input = topicDetailBodySchema.parse(req.body);
  const detail = await roadmapService.getTopicDetail(input);
  ApiResponse.ok(res, detail);
});

export const getLearnGraph = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const input = learnGraphBodySchema.parse(req.body);
  const graph = await roadmapService.getLearnGraph(input);
  ApiResponse.ok(res, graph);
});
