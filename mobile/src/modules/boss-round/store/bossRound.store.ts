import { create } from 'zustand';
import type { BossQuestion } from '../../../shared/types/card.types';

interface BossRoundState {
  sessionId: string | null;
  questions: BossQuestion[];
  currentIndex: number;
  combo: number;
  xpGained: number;
  xpLost: number;

  start: (sessionId: string, questions: BossQuestion[]) => void;
  answer: (correct: boolean, xpDelta: number) => void;
  reset: () => void;
}

export const useBossRoundStore = create<BossRoundState>((set, get) => ({
  sessionId: null,
  questions: [],
  currentIndex: 0,
  combo: 0,
  xpGained: 0,
  xpLost: 0,

  start: (sessionId, questions) =>
    set({ sessionId, questions, currentIndex: 0, combo: 0, xpGained: 0, xpLost: 0 }),
  answer: (correct, xpDelta) =>
    set({
      currentIndex: get().currentIndex + 1,
      combo: correct ? get().combo + 1 : 0,
      xpGained: correct ? get().xpGained + xpDelta : get().xpGained,
      xpLost: correct ? get().xpLost : get().xpLost + Math.abs(xpDelta),
    }),
  reset: () =>
    set({ sessionId: null, questions: [], currentIndex: 0, combo: 0, xpGained: 0, xpLost: 0 }),
}));
