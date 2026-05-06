import { Router } from 'express';
import { asyncHandler } from '../../shared/utils/asyncHandler';
import { authMiddleware } from '../../shared/middleware/auth.middleware';
import { learningFeedController } from './learningFeed.controller';

export const learningFeedRouter = Router();

learningFeedRouter.use(authMiddleware);
learningFeedRouter.get('/', asyncHandler(learningFeedController.getFeed));
learningFeedRouter.post('/interaction', asyncHandler(learningFeedController.recordInteraction));
