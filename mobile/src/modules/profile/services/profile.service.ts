import { apiClient, unwrap } from '../../../shared/services/api.client';
import type { ApiEnvelope } from '../../../shared/types/api.types';
import type { AnonymousUser } from '../../../shared/types/user.types';

export interface UpdateProfileInput {
  currentHobbyId?: string;
  dailyTimeMinutes?: number;
  skillLevel?: 'beginner' | 'intermediate' | 'advanced';
}

export const profileService = {
  async getMe(): Promise<AnonymousUser> {
    return unwrap(apiClient.get<ApiEnvelope<AnonymousUser>>('/profile/me'));
  },

  async update(input: UpdateProfileInput): Promise<AnonymousUser> {
    return unwrap(apiClient.patch<ApiEnvelope<AnonymousUser>>('/profile/me', input));
  },
};
