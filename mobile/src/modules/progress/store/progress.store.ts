import { create } from 'zustand';
import type { ProgressSession } from '../types/progress.types';

interface ProgressState {
  session: ProgressSession | null;
  setSession: (s: ProgressSession) => void;
  clear: () => void;
}

export const useProgressStore = create<ProgressState>((set) => ({
  session: null,
  setSession: (s) => set({ session: s }),
  clear: () => set({ session: null }),
}));
