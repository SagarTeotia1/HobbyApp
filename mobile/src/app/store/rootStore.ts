import { create } from 'zustand';
import { storageService } from '../../shared/services/storage.service';
import type { DifficultyLevel } from '../../shared/types/card.types';

interface UserState {
  uuid: string | null;
  jwt: string | null;
  currentHobbyId: string | null;
  skillLevel: DifficultyLevel;
  dailyTimeMinutes: number;
  xp: number;
  level: number;
  streak: number;
  isOnboarded: boolean;

  hydrate: () => void;
  setAuth: (uuid: string, jwt: string) => void;
  setHobby: (hobbyId: string) => void;
  setPreferences: (dailyTimeMinutes: number, skillLevel: DifficultyLevel) => void;
  setOnboarded: (done: boolean) => void;
  setStats: (xp: number, level: number, streak: number) => void;
  addXP: (delta: number) => void;
  reset: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  uuid: null,
  jwt: null,
  currentHobbyId: null,
  skillLevel: 'beginner',
  dailyTimeMinutes: 10,
  xp: 0,
  level: 1,
  streak: 0,
  isOnboarded: false,

  hydrate: () => {
    set({
      uuid: storageService.getUUID() ?? null,
      jwt: storageService.getJWT() ?? null,
      currentHobbyId: storageService.getCurrentHobby() ?? null,
      isOnboarded: storageService.getOnboardingDone(),
    });
  },

  setAuth: (uuid, jwt) => {
    storageService.setUUID(uuid);
    storageService.setJWT(jwt);
    set({ uuid, jwt });
  },

  setHobby: (hobbyId) => {
    storageService.setCurrentHobby(hobbyId);
    set({ currentHobbyId: hobbyId });
  },

  setPreferences: (dailyTimeMinutes, skillLevel) => set({ dailyTimeMinutes, skillLevel }),

  setOnboarded: (done) => {
    storageService.setOnboardingDone(done);
    set({ isOnboarded: done });
  },

  setStats: (xp, level, streak) => set({ xp, level, streak }),

  addXP: (delta) => set({ xp: Math.max(0, get().xp + delta) }),

  reset: () => {
    storageService.clearAll();
    set({
      uuid: null,
      jwt: null,
      currentHobbyId: null,
      skillLevel: 'beginner',
      dailyTimeMinutes: 10,
      xp: 0,
      level: 1,
      streak: 0,
      isOnboarded: false,
    });
  },
}));
