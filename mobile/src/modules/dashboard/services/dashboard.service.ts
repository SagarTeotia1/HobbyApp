import { apiClient, unwrap } from '../../../shared/services/api.client';
import type { ApiEnvelope } from '../../../shared/types/api.types';
import type { AnonymousUser } from '../../../shared/types/user.types';

export const dashboardService = {
  async getMe(): Promise<AnonymousUser> {
    return unwrap(apiClient.get<ApiEnvelope<AnonymousUser>>('/profile/me'));
  },
};
