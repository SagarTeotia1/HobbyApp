import { Router } from 'express';
import { authMiddleware } from '../../shared/middleware/auth.middleware';
import { asyncHandler } from '../../shared/utils/asyncHandler';
import { youtubeController } from './youtube.controller';

export const youtubeRouter = Router();

youtubeRouter.use(authMiddleware);

youtubeRouter.get('/videos', asyncHandler(youtubeController.getVideos));
