import { apiClient } from '../../../shared/services/api.client';
import type { ApiSuccess } from '../../../shared/types/api.types';
import type { ProgressSession } from '../types/progress.types';

export const progressService = {
  getSession: async (sessionId: string): Promise<ProgressSession> => {
    const res = await apiClient.get<ApiSuccess<ProgressSession>>(
      `/progress/session?sessionId=${sessionId}`,
    );
    return res.data.data;
  },
};
