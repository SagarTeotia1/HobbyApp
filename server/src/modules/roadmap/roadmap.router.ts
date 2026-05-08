import { Router } from 'express';
import { authMiddleware } from '../../shared/middleware/auth.middleware';
import { getTopicDetail, getLearnGraph } from './roadmap.controller';

export const roadmapRouter = Router();

roadmapRouter.use(authMiddleware);
roadmapRouter.post('/topic-detail', getTopicDetail);
roadmapRouter.post('/learn-graph',  getLearnGraph);
