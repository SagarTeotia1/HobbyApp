import { apiClient, unwrap } from '../../../shared/services/api.client';
import type { ApiEnvelope } from '../../../shared/types/api.types';
import type { ProgressSession } from '../types/progress.types';

export interface ProgressSummary {
  xp: number;
  level: number;
  streak: number;
  cardsSeen: number;
  cardsUnderstood: number;
  weakConcepts: string[];
  masteredConcepts: string[];
}

export interface DashboardData {
  xp: number;
  level: number;
  streak: number;
  progressToNextLevel: number;
  cardsSeen: number;
  cardsUnderstood: number;
  weakConcepts: string[];
  masteredConcepts: string[];
  currentDifficulty: string;
}

export const progressService = {
  getSession: (sessionId: string): Promise<ProgressSession> =>
    unwrap(
      apiClient.get<ApiEnvelope<ProgressSession>>('/progress/session', {
        params: { sessionId },
      }),
    ),

  getSummary: (hobbyId: string): Promise<ProgressSummary> =>
    unwrap(
      apiClient.get<ApiEnvelope<ProgressSummary>>('/progress/summary', {
        params: { hobbyId },
      }),
    ),

  getDashboard: (hobbyId: string): Promise<DashboardData> =>
    unwrap(
      apiClient.get<ApiEnvelope<DashboardData>>('/progress/dashboard', {
        params: { hobbyId },
      }),
    ),
};
