import { useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { roadmapService } from '../services/roadmap.service';
import { queryKeys } from '../../../shared/constants/queryKeys';
import type { RoadmapData } from '../types/roadmap.types';

interface UseRoadmapResult {
  roadmap: RoadmapData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  invalidate: () => void;
}

export function useRoadmap(hobbyId: string): UseRoadmapResult {
  const queryClient = useQueryClient();

  const { data: roadmap = null, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.roadmap.byId(hobbyId),
    queryFn: () => roadmapService.getRoadmap(hobbyId),
    enabled: !!hobbyId,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });

  const invalidate = useCallback(() => {
    queryClient.removeQueries({ queryKey: queryKeys.roadmap.byId(hobbyId) });
  }, [queryClient, hobbyId]);

  return {
    roadmap,
    loading: isLoading,
    error: error instanceof Error ? error.message : error ? 'Failed to load roadmap' : null,
    refetch,
    invalidate,
  };
}
