import { Router } from 'express';
import { asyncHandler } from '../../shared/utils/asyncHandler';
import { authMiddleware } from '../../shared/middleware/auth.middleware';
import { learningFeedController } from './learningFeed.controller';

export const learningFeedRouter = Router();

learningFeedRouter.use(authMiddleware);
learningFeedRouter.get('/cards', asyncHandler(learningFeedController.getCards));
learningFeedRouter.post('/signal', asyncHandler(learningFeedController.recordSignal));
learningFeedRouter.post('/simplify', asyncHandler(learningFeedController.simplify));
