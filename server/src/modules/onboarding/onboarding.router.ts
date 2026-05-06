import { Router } from 'express';
import { asyncHandler } from '../../shared/utils/asyncHandler';
import { onboardingController } from './onboarding.controller';

export const onboardingRouter = Router();

onboardingRouter.post('/', asyncHandler(onboardingController.create));
