import { useCallback } from 'react';
import { useLearningFeedStore } from '../store/learningFeed.store';

export function useSessionRound() {
  const recordCardSeen = useLearningFeedStore((s) => s.recordCardSeen);

  const advance = useCallback(() => {
    recordCardSeen();
  }, [recordCardSeen]);

  return { advance };
}
