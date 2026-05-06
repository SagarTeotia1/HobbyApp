import { Router } from 'express';
import { asyncHandler } from '../../shared/utils/asyncHandler';
import { authMiddleware } from '../../shared/middleware/auth.middleware';
import { profileController } from './profile.controller';

export const profileRouter = Router();

profileRouter.use(authMiddleware);
profileRouter.get('/me', asyncHandler(profileController.getMine));
profileRouter.patch('/me', asyncHandler(profileController.update));
