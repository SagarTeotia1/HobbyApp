import { useCallback } from 'react';
import { useLearningFeedStore } from '../store/learningFeed.store';
import { SessionEngine } from '../engines/SessionEngine';

export function useSessionRound() {
  const cardsSinceLastSpeed = useLearningFeedStore((s) => s.cardsSinceLastSpeed);
  const cardsSinceLastBoss = useLearningFeedStore((s) => s.cardsSinceLastBoss);
  const lastRoundType = useLearningFeedStore((s) => s.lastRoundType);
  const recordCardSeen = useLearningFeedStore((s) => s.recordCardSeen);
  const markRoundType = useLearningFeedStore((s) => s.markRoundType);

  const advance = useCallback(() => {
    recordCardSeen();
    const action = SessionEngine.getNextAction({
      cardsSinceLastSpeed: cardsSinceLastSpeed + 1,
      cardsSinceLastBoss: cardsSinceLastBoss + 1,
      lastRoundType,
    });

    if (action === 'trigger_speed') {
      markRoundType('speed');
      return 'speed_round' as const;
    }
    if (action === 'trigger_boss') {
      markRoundType('boss');
      return 'boss_round' as const;
    }
    return 'cards' as const;
  }, [cardsSinceLastBoss, cardsSinceLastSpeed, lastRoundType, markRoundType, recordCardSeen]);

  return { cardsSinceLastSpeed, cardsSinceLastBoss, advance };
}
