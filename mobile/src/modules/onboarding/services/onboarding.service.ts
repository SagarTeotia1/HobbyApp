import { apiClient, unwrap } from '../../../shared/services/api.client';
import type { ApiEnvelope } from '../../../shared/types/api.types';

export interface OnboardingPayload {
  hobbySlug: string;
  dailyTimeMinutes: number;
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
}

export interface OnboardingResponse {
  uuid: string;
  jwt: string;
}

export const onboardingService = {
  async submit(payload: OnboardingPayload): Promise<OnboardingResponse> {
    return unwrap(
      apiClient.post<ApiEnvelope<OnboardingResponse>>('/onboarding', payload),
    );
  },
};
