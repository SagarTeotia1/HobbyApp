import { useCallback } from 'react';
import type { CardInteraction } from '../../../shared/types/card.types';
import { useLearningFeedStore } from '../store/learningFeed.store';
import { useUserStore } from '../../../app/store/rootStore';
import { learningFeedService } from '../services/learningFeed.service';

export function useAdaptiveLearning() {
  const hobbyId = useUserStore((s) => s.currentHobbyId);
  const sessionId = useLearningFeedStore((s) => s.sessionId);
  const addXP = useUserStore((s) => s.addXP);

  const sendSignal = useCallback(
    async (cardId: string, interaction: CardInteraction, responseTimeMs: number) => {
      if (!hobbyId || !sessionId) return;
      const result = await learningFeedService.recordInteraction({
        cardId,
        hobbyId,
        interaction,
        responseTimeMs,
        sessionId,
      });
      addXP(result.xpDelta);
    },
    [addXP, hobbyId, sessionId],
  );

  return { sendSignal };
}
