import { apiClient, unwrap } from '../../../shared/services/api.client';
import type { ApiEnvelope } from '../../../shared/types/api.types';
import type { DifficultyLevel } from '../../../shared/types/card.types';

export interface CompleteOnboardingPayload {
  hobbySlug: string;
  dailyMinutes: 5 | 10 | 15 | 30 | 60;
  skillLevel: DifficultyLevel;
}

export interface InitOnboardingResponse {
  user: {
    uuid: string;
  };
  token: string;
}

export interface CompleteOnboardingResponse {
  roadmap: {
    hobbyId: string;
  };
  firstCards: Array<{ id: string }>;
}

export const onboardingService = {
  async init(): Promise<InitOnboardingResponse> {
    return unwrap(apiClient.post<ApiEnvelope<InitOnboardingResponse>>('/onboarding/init', {}));
  },

  async complete(payload: CompleteOnboardingPayload): Promise<CompleteOnboardingResponse> {
    return unwrap(
      apiClient.post<ApiEnvelope<CompleteOnboardingResponse>>('/onboarding/complete', payload),
    );
  },

  async searchHobbies(query: string): Promise<Array<{ slug: string; name: string }>> {
    return unwrap(
      apiClient.get<ApiEnvelope<Array<{ slug: string; name: string }>>>('/hobbies', { params: { q: query } }),
    );
  },
};
