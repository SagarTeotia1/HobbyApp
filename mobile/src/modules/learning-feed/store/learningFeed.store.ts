import { create } from 'zustand';
import type { LearningCard } from '../../../shared/types/card.types';

interface LearningFeedState {
  sessionId: string | null;
  cards: LearningCard[];
  cursor: string | null;
  cardsSeenInRound: number;

  setSession: (id: string) => void;
  setCards: (cards: LearningCard[]) => void;
  appendCards: (cards: LearningCard[]) => void;
  popFront: () => LearningCard | undefined;
  bumpRoundCount: () => void;
  resetRoundCount: () => void;
}

export const useLearningFeedStore = create<LearningFeedState>((set, get) => ({
  sessionId: null,
  cards: [],
  cursor: null,
  cardsSeenInRound: 0,

  setSession: (id) => set({ sessionId: id }),
  setCards: (cards) => set({ cards }),
  appendCards: (cards) => set({ cards: [...get().cards, ...cards] }),
  popFront: () => {
    const [first, ...rest] = get().cards;
    set({ cards: rest });
    return first;
  },
  bumpRoundCount: () => set({ cardsSeenInRound: get().cardsSeenInRound + 1 }),
  resetRoundCount: () => set({ cardsSeenInRound: 0 }),
}));
