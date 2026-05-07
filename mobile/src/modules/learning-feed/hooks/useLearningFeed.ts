import { useQuery } from '@tanstack/react-query';
import { learningFeedService } from '../services/learningFeed.service';
import { queryKeys } from '../../../shared/constants/queryKeys';

export function useLearningFeed(hobbyId: string | null) {
  return useQuery({
    queryKey: hobbyId ? queryKeys.feed.forHobby(hobbyId) : ['feed', 'idle'],
    queryFn: () => learningFeedService.getFeed({ hobbyId: hobbyId as string, limit: 10 }),
    enabled: !!hobbyId,
  });
}
