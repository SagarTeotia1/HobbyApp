import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { learningFeedService } from '../services/learningFeed.service';
import { queryKeys } from '../../../shared/constants/queryKeys';
import { useLearningFeedStore } from '../store/learningFeed.store';
import { generateUUID } from '../../../shared/utils/generateUUID';

export function useLearningFeed(hobbyId: string | null) {
  const sessionId = useLearningFeedStore((s) => s.sessionId);
  const setSession = useLearningFeedStore((s) => s.setSession);
  const fallbackSessionRef = useRef<string>(generateUUID());
  const stableSessionId = sessionId ?? fallbackSessionRef.current;
  useEffect(() => {
    if (!sessionId) setSession(stableSessionId);
  }, [sessionId, setSession, stableSessionId]);

  return useInfiniteQuery({
    queryKey: hobbyId ? queryKeys.feed.forHobby(hobbyId) : ['feed', 'idle'],
    initialPageParam: 1,
    queryFn: () =>
      learningFeedService.getFeed({
        hobbyId: hobbyId as string,
        sessionId: stableSessionId,
        limit: 10,
      }),
    getNextPageParam: (lastPage, pages) => (lastPage.hasMore ? pages.length + 1 : undefined),
    enabled: !!hobbyId,
  });
}
