import { Router } from 'express';
import { authMiddleware } from '../../shared/middleware/auth.middleware';
import { getTopicDetail, getLearnGraph, getUserRoadmap, generateRoadmap } from './roadmap.controller';

export const roadmapRouter = Router();

roadmapRouter.use(authMiddleware);
roadmapRouter.post('/generate',      generateRoadmap);
roadmapRouter.get('/:hobbyId',       getUserRoadmap);
roadmapRouter.post('/topic-detail',  getTopicDetail);
roadmapRouter.post('/learn-graph',   getLearnGraph);
