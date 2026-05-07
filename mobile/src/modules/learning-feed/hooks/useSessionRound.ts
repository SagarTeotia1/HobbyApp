import { useCallback } from 'react';
import { useLearningFeedStore } from '../store/learningFeed.store';
import { SessionEngine } from '../engines/SessionEngine';

export function useSessionRound() {
  const cardsSeen = useLearningFeedStore((s) => s.cardsSeenInRound);
  const bump = useLearningFeedStore((s) => s.bumpRoundCount);
  const reset = useLearningFeedStore((s) => s.resetRoundCount);

  const advance = useCallback(() => {
    const result = SessionEngine.next({
      cardsSinceLastSpeed: cardsSeen,
      speedRoundsSinceLastBoss: 0,
    });
    if (result.phase === 'cards') {
      bump();
    } else {
      reset();
    }
    return result.phase;
  }, [cardsSeen, bump, reset]);

  return { cardsSeen, advance };
}
