import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import { env } from '../../config/env';
import { UserModel } from '../../models/User.model';
import type { OnboardingInput } from './onboarding.validator';
import type { OnboardingResponse } from './onboarding.types';

export const onboardingService = {
  async createAnonymousProfile(input: OnboardingInput): Promise<OnboardingResponse> {
    const uuid = nanoid(21);
    await UserModel.create({
      uuid,
      currentHobbyId: input.hobbySlug,
      dailyTimeMinutes: input.dailyTimeMinutes,
      skillLevel: input.skillLevel,
      type: 'anonymous',
    });

    const token = jwt.sign({ sub: uuid, type: 'anonymous' }, env.JWT_SECRET, {
      expiresIn: '365d',
    });

    return { uuid, jwt: token };
  },
};
