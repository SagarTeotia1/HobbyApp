import type { Request, Response } from 'express';
import { asyncHandler } from '../../shared/utils/asyncHandler';
import { ApiResponse } from '../../shared/utils/ApiResponse';
import { topicDetailBodySchema, learnGraphBodySchema } from './roadmap.validator';
import { roadmapService } from './roadmap.service';
import { RoadmapModel } from '../../models/Roadmap.model';
import { HobbyModel } from '../../models/Hobby.model';
import { UserModel } from '../../models/User.model';
import { aiService } from '../ai/ai.service';
import { ApiError } from '../../shared/utils/ApiError';

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

export const getUserRoadmap = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { hobbyId } = req.params as { hobbyId: string };
  const userId = (req as Request & { user: { uuid: string } }).user.uuid;

  const roadmap = await RoadmapModel.findOne({ userId, hobbyId }).lean();
  if (!roadmap) throw new ApiError(404, 'ROADMAP_NOT_FOUND', 'No roadmap found for this hobby');

  ApiResponse.ok(res, {
    hobbyId: roadmap.hobbyId,
    skillLevel: roadmap.skillLevel,
    stages: roadmap.stages.map((s) => ({
      order: s.order,
      conceptId: s.conceptId,
      title: s.title,
      description: s.description,
      isUnlocked: s.isUnlocked,
      isMastered: s.isMastered,
    })),
  });
});

export const generateRoadmap = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { hobbyId, skillLevel, dailyMinutes } = req.body as {
    hobbyId: string;
    skillLevel: 'beginner' | 'intermediate' | 'advanced';
    dailyMinutes: number;
  };
  const userId = (req as Request & { user: { uuid: string } }).user.uuid;

  let hobby = await HobbyModel.findOne({ slug: hobbyId }).lean();
  if (!hobby) {
    const normalized = await aiService.normalizeHobby(hobbyId);
    hobby = await HobbyModel.findOne({ slug: normalized.slug }).lean();
    if (!hobby) {
      hobby = await HobbyModel.create({ slug: normalized.slug, name: normalized.name, isActive: true });
    }
  }

  const stages = await aiService.generateRoadmap({ hobby: hobby.name, level: skillLevel, dailyMinutes });

  const roadmap = await RoadmapModel.findOneAndUpdate(
    { userId, hobbyId: hobby.slug },
    {
      $set: {
        userId,
        hobbyId: hobby.slug,
        skillLevel,
        stages: stages.map((stage, i) => ({ ...stage, order: i, isUnlocked: i === 0, isMastered: false })),
        currentStageOrder: 0,
        generatedAt: new Date(),
      },
    },
    { upsert: true, new: true },
  ).lean();

  await UserModel.updateOne({ uuid: userId }, { $set: { currentHobbyId: hobby.slug } });

  ApiResponse.ok(res, {
    hobbyId: roadmap.hobbyId,
    skillLevel: roadmap.skillLevel,
    stages: roadmap.stages.map((s) => ({
      order: s.order,
      conceptId: s.conceptId,
      title: s.title,
      description: s.description,
      isUnlocked: s.isUnlocked,
      isMastered: s.isMastered,
    })),
  });
});
