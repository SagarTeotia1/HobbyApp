import { useState, useCallback } from 'react';
import { roadmapService } from '../services/roadmap.service';
import type { LearnGraph } from '../types/roadmap.types';

interface LearnGraphParams {
  hobbyId: string;
  topicId: string;
  topicName: string;
  hobbyName: string;
}

interface UseLearnGraphResult {
  graph: LearnGraph | null;
  isLoading: boolean;
  error: string | null;
  fetch: (params: LearnGraphParams) => Promise<void>;
  reset: () => void;
}

export function useLearnGraph(): UseLearnGraphResult {
  const [graph, setGraph] = useState<LearnGraph | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async (params: LearnGraphParams) => {
    setLoading(true);
    setError(null);
    try {
      const data = await roadmapService.getLearnGraph(params);
      setGraph(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to generate graph');
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setGraph(null);
    setError(null);
  }, []);

  return { graph, isLoading, error, fetch, reset };
}
