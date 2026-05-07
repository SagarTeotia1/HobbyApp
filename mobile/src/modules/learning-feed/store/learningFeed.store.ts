import { create } from 'zustand';
import type { LearningCard } from '../../../shared/types/card.types';

interface LearningFeedState {
  sessionId: string | null;
  cards: LearningCard[];
  cardsSinceLastSpeed: number;
  cardsSinceLastBoss: number;
  lastRoundType: 'speed' | 'boss' | 'none';

  setSession: (id: string) => void;
  setCards: (cards: LearningCard[]) => void;
  appendCards: (cards: LearningCard[]) => void;
  popFront: () => LearningCard | undefined;
  recordCardSeen: () => void;
  markRoundType: (round: 'speed' | 'boss') => void;
  resetCounters: () => void;
  resetAll: () => void;
}

export const useLearningFeedStore = create<LearningFeedState>((set, get) => ({
  sessionId: null,
  cards: [],
  cardsSinceLastSpeed: 0,
  cardsSinceLastBoss: 0,
  lastRoundType: 'none',

  setSession: (id) => set({ sessionId: id }),
  setCards: (cards) => set({ cards }),
  appendCards: (cards) => set({ cards: [...get().cards, ...cards] }),
  popFront: () => {
    const [first, ...rest] = get().cards;
    set({ cards: rest });
    return first;
  },
  recordCardSeen: () =>
    set({
      cardsSinceLastSpeed: get().cardsSinceLastSpeed + 1,
      cardsSinceLastBoss: get().cardsSinceLastBoss + 1,
    }),
  markRoundType: (round) =>
    set({
      lastRoundType: round,
      cardsSinceLastSpeed: round === 'speed' ? 0 : get().cardsSinceLastSpeed,
      cardsSinceLastBoss: round === 'boss' ? 0 : get().cardsSinceLastBoss,
    }),
  resetCounters: () => set({ cardsSinceLastSpeed: 0, cardsSinceLastBoss: 0, lastRoundType: 'none' }),
  resetAll: () =>
    set({
      sessionId: null,
      cards: [],
      cardsSinceLastSpeed: 0,
      cardsSinceLastBoss: 0,
      lastRoundType: 'none',
    }),
}));
