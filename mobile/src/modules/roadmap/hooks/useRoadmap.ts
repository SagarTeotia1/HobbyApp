import { useState, useEffect, useCallback } from 'react';
import { roadmapService } from '../services/roadmap.service';
import type { RoadmapData } from '../types/roadmap.types';

interface UseRoadmapState {
  roadmap: RoadmapData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useRoadmap(hobbyId: string): UseRoadmapState {
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!hobbyId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await roadmapService.getRoadmap(hobbyId);
      setRoadmap(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load roadmap');
    } finally {
      setLoading(false);
    }
  }, [hobbyId]);

  useEffect(() => {
    void fetch();
  }, [fetch]);

  return { roadmap, loading, error, refetch: fetch };
}
