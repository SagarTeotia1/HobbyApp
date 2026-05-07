import { Router } from 'express';
import { asyncHandler } from '../../shared/utils/asyncHandler';
import { authMiddleware } from '../../shared/middleware/auth.middleware';
import { onboardingController } from './onboarding.controller';

export const onboardingRouter = Router();

onboardingRouter.post('/init', asyncHandler(onboardingController.init));
onboardingRouter.post('/complete', authMiddleware, asyncHandler(onboardingController.complete));
