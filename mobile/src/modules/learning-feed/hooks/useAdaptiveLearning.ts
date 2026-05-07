import { useCallback } from 'react';
import type { CardInteraction } from '../../../shared/types/card.types';

export function useAdaptiveLearning() {
  const sendSignal = useCallback(
    (_cardId: string, _interaction: CardInteraction, _responseTimeMs: number) => {
      // TODO: forward to DifficultyEngine and persist via API
    },
    [],
  );

  return { sendSignal };
}
