import { apiClient, unwrap } from '../../../shared/services/api.client';
import type { ApiEnvelope } from '../../../shared/types/api.types';

export interface DashboardRoadmapStage {
  id: string;
  title: string;
  isCompleted: boolean;
  isCurrent: boolean;
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
  hobbyName: string;
  hobbyId: string;
  roadmapStages: DashboardRoadmapStage[];
}

export const dashboardService = {
  get: (hobbyId: string): Promise<DashboardData> =>
    unwrap(
      apiClient.get<ApiEnvelope<DashboardData>>('/progress/dashboard', {
        params: { hobbyId },
      }),
    ),
};
