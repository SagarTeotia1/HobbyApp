import { useMutation } from '@tanstack/react-query';
import {
  learningFeedService,
  type InteractionPayload,
} from '../services/learningFeed.service';

export function useSwipeActions() {
  return useMutation({
    mutationFn: (payload: InteractionPayload) => learningFeedService.recordInteraction(payload),
  });
}
