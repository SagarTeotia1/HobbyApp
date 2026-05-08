import { useState } from 'react';
import { roadmapService } from '../services/roadmap.service';
import type { TopicDetail } from '../types/roadmap.types';

interface UseTopicDetailResult {
  detail: TopicDetail | null;
  isLoading: boolean;
  error: string | null;
  fetch: (params: { hobbyId: string; topicId: string; topicName: string; hobbyName: string }) => Promise<void>;
  reset: () => void;
}

export function useTopicDetail(): UseTopicDetailResult {
  const [detail, setDetail]   = useState<TopicDetail | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  async function fetch(params: { hobbyId: string; topicId: string; topicName: string; hobbyName: string }) {
    setLoading(true);
    setError(null);
    try {
      const data = await roadmapService.getTopicDetail(params);
      setDetail(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load detail');
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setDetail(null);
    setError(null);
  }

  return { detail, isLoading, error, fetch, reset };
}
