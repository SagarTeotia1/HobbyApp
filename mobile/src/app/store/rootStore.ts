import { create } from 'zustand';
import { storageService } from '../../shared/services/storage.service';
import { GAME_CONFIG } from '../../shared/constants/gameConfig';
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
  updateStreak: () => void;
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
      xp: storageService.getXP(),
      level: storageService.getLevel(),
      streak: storageService.getStreak(),
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

  setStats: (xp, level, streak) => {
    storageService.setXP(xp);
    storageService.setLevel(level);
    storageService.setStreak(streak);
    set({ xp, level, streak });
  },

  addXP: (delta) => {
    const newXP = Math.max(0, get().xp + delta);
    const newLevel = Math.floor(newXP / GAME_CONFIG.LEVELS.XP_PER_LEVEL) + 1;
    storageService.setXP(newXP);
    storageService.setLevel(newLevel);
    set({ xp: newXP, level: newLevel });
  },

  updateStreak: () => {
    const today = new Date().toDateString();
    const last = storageService.getLastSessionDate();
    if (last === today) return;
    const yesterday = new Date(Date.now() - 86_400_000).toDateString();
    const newStreak = last === yesterday ? get().streak + 1 : 1;
    storageService.setStreak(newStreak);
    storageService.setLastSessionDate(today);
    set({ streak: newStreak });
  },

  reset: () => {
    storageService.clearAll();
    set({ uuid: null, jwt: null, currentHobbyId: null, skillLevel: 'beginner', dailyTimeMinutes: 10, xp: 0, level: 1, streak: 0, isOnboarded: false });
  },
}));
