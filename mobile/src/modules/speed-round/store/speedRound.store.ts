import { create } from 'zustand';
import type { QuizQuestion } from '../../../shared/types/card.types';

interface SpeedRoundState {
  sessionId: string | null;
  questions: QuizQuestion[];
  currentIndex: number;
  correctCount: number;
  startedAt: number | null;

  start: (sessionId: string, questions: QuizQuestion[]) => void;
  answer: (correct: boolean) => void;
  reset: () => void;
}

export const useSpeedRoundStore = create<SpeedRoundState>((set, get) => ({
  sessionId: null,
  questions: [],
  currentIndex: 0,
  correctCount: 0,
  startedAt: null,

  start: (sessionId, questions) =>
    set({ sessionId, questions, currentIndex: 0, correctCount: 0, startedAt: Date.now() }),
  answer: (correct) =>
    set({
      currentIndex: get().currentIndex + 1,
      correctCount: correct ? get().correctCount + 1 : get().correctCount,
    }),
  reset: () =>
    set({ sessionId: null, questions: [], currentIndex: 0, correctCount: 0, startedAt: null }),
}));
