import type { Request, Response } from 'express';
import { ApiResponse } from '../../shared/utils/ApiResponse';
import { onboardingSchema } from './onboarding.validator';
import { onboardingService } from './onboarding.service';

export const onboardingController = {
  async create(req: Request, res: Response): Promise<Response> {
    const payload = onboardingSchema.parse(req.body);
    const result = await onboardingService.createAnonymousProfile(payload);
    return ApiResponse.created(res, result);
  },
};
