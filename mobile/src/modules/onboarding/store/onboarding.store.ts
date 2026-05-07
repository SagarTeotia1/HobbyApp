import { create } from 'zustand';
import type { DifficultyLevel } from '../../../shared/types/card.types';

interface OnboardingState {
  hobbySlug: string | null;
  dailyTimeMinutes: number;
  skillLevel: DifficultyLevel;

  setHobby: (slug: string) => void;
  setTime: (minutes: number) => void;
  setLevel: (level: DifficultyLevel) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  hobbySlug: null,
  dailyTimeMinutes: 10,
  skillLevel: 'beginner',

  setHobby: (slug) => set({ hobbySlug: slug }),
  setTime: (minutes) => set({ dailyTimeMinutes: minutes }),
  setLevel: (level) => set({ skillLevel: level }),
  reset: () => set({ hobbySlug: null, dailyTimeMinutes: 10, skillLevel: 'beginner' }),
}));
