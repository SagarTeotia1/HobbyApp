import { useCallback } from 'react';
import type { CardInteraction } from '../../../shared/types/card.types';
import { useAdaptiveLearning } from './useAdaptiveLearning';

export function useSwipeActions() {
  const { sendSignal } = useAdaptiveLearning();

  const onSwipe = useCallback(
    async (cardId: string, direction: 'left' | 'right' | 'down', responseTimeMs: number) => {
      const interaction: CardInteraction =
        direction === 'right' ? 'understood' : direction === 'left' ? 'needs_review' : 'needs_simpler';
      await sendSignal(cardId, interaction, responseTimeMs);
    },
    [sendSignal],
  );

  return { onSwipe };
}
