import { Router } from 'express';
import { asyncHandler } from '../../shared/utils/asyncHandler';
import { authMiddleware } from '../../shared/middleware/auth.middleware';
import { progressController } from './progress.controller';

export const progressRouter = Router();

progressRouter.use(authMiddleware);
progressRouter.get('/summary', asyncHandler(progressController.getSummary));
