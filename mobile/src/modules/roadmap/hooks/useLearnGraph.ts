import { useState } from 'react';
import { roadmapService } from '../services/roadmap.service';
import type { LearnGraph } from '../types/roadmap.types';

interface UseLearnGraphResult {
  graph: LearnGraph | null;
  isLoading: boolean;
  error: string | null;
  fetch: (params: { hobbyId: string; topicId: string; topicName: string; hobbyName: string }) => Promise<void>;
  reset: () => void;
}

export function useLearnGraph(): UseLearnGraphResult {
  const [graph, setGraph]     = useState<LearnGraph | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  async function fetch(params: { hobbyId: string; topicId: string; topicName: string; hobbyName: string }) {
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
  }

  function reset() {
    setGraph(null);
    setError(null);
  }

  return { graph, isLoading, error, fetch, reset };
}
