import { create } from 'zustand';
import type { LearningCard } from '../../../shared/types/card.types';

interface LearningFeedState {
  sessionId: string | null;
  cards: LearningCard[];
  cardsSeen: number;

  setSession: (id: string) => void;
  setCards: (cards: LearningCard[]) => void;
  appendCards: (cards: LearningCard[]) => void;
  popFront: () => LearningCard | undefined;
  recordCardSeen: () => void;
  resetAll: () => void;
}

export const useLearningFeedStore = create<LearningFeedState>((set, get) => ({
  sessionId: null,
  cards: [],
  cardsSeen: 0,

  setSession: (id) => set({ sessionId: id }),
  setCards: (cards) => set({ cards }),
  appendCards: (cards) => set({ cards: [...get().cards, ...cards] }),
  popFront: () => {
    const [first, ...rest] = get().cards;
    set({ cards: rest });
    return first;
  },
  recordCardSeen: () => set({ cardsSeen: get().cardsSeen + 1 }),
  resetAll: () => set({ sessionId: null, cards: [], cardsSeen: 0 }),
}));
