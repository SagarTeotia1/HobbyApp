import type { Request, Response } from 'express';
import { ApiResponse } from '../../shared/utils/ApiResponse';
import { ApiError } from '../../shared/utils/ApiError';
import { onboardingCompleteSchema, onboardingInitSchema } from './onboarding.validator';
import { onboardingService } from './onboarding.service';

export const onboardingController = {
  async init(req: Request, res: Response): Promise<Response> {
    onboardingInitSchema.parse(req.body ?? {});
    const result = await onboardingService.createAnonymousUser();
    return ApiResponse.created(res, result);
  },

  async complete(req: Request, res: Response): Promise<Response> {
    if (!req.user) throw ApiError.unauthorized();
    const payload = onboardingCompleteSchema.parse(req.body);
    const result = await onboardingService.completeOnboarding(req.user.uuid, payload);
    return ApiResponse.ok(res, result);
  },
};
