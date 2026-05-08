import { useState, useEffect, useCallback, useRef } from 'react';
import { roadmapService } from '../services/roadmap.service';
import type { RoadmapData } from '../types/roadmap.types';

// Module-level cache so stages survive screen remounts (e.g. back from FeedScreen)
const roadmapCache: Record<string, RoadmapData> = {};

export function invalidateRoadmapCache(hobbyId: string): void {
  delete roadmapCache[hobbyId];
}

interface UseRoadmapState {
  roadmap: RoadmapData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useRoadmap(hobbyId: string): UseRoadmapState {
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(roadmapCache[hobbyId] ?? null);
  const [loading, setLoading] = useState(!roadmapCache[hobbyId]);
  const [error, setError] = useState<string | null>(null);
  const fetchedRef = useRef<string | null>(null);

  const fetch = useCallback(async () => {
    if (!hobbyId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await roadmapService.getRoadmap(hobbyId);
      roadmapCache[hobbyId] = data;
      setRoadmap(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load roadmap');
    } finally {
      setLoading(false);
    }
  }, [hobbyId]);

  useEffect(() => {
    // Only fetch once per hobbyId per session unless explicitly refetched
    if (fetchedRef.current === hobbyId) return;
    fetchedRef.current = hobbyId;
    if (!roadmapCache[hobbyId]) {
      void fetch();
    }
  }, [hobbyId, fetch]);

  const refetch = useCallback(() => {
    delete roadmapCache[hobbyId];
    fetchedRef.current = null;
    void fetch();
  }, [hobbyId, fetch]);

  return { roadmap, loading: loading && !roadmap, error, refetch };
}
