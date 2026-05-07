import { useQuery } from '@tanstack/react-query';
import { apiClient, unwrap } from '../../../shared/services/api.client';
import { queryKeys } from '../../../shared/constants/queryKeys';
import type { ApiEnvelope } from '../../../shared/types/api.types';

export interface ProgressSummary {
  xp: number;
  level: number;
  streak: number;
  cardsSeen: number;
  cardsUnderstood: number;
  weakConcepts: string[];
  masteredConcepts: string[];
}

export function useProgress(hobbyId: string | null) {
  return useQuery({
    queryKey: hobbyId ? queryKeys.progress.summary(hobbyId) : ['progress', 'idle'],
    queryFn: () =>
      unwrap(
        apiClient.get<ApiEnvelope<ProgressSummary>>('/progress/summary', {
          params: { hobbyId },
        }),
      ),
    enabled: !!hobbyId,
  });
}
