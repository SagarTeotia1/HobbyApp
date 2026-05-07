import { GAME_CONFIG } from '../../shared/constants/gameConfig';

export interface XpResult {
  xpDelta: number;
  newXp: number;
  newLevel: number;
  leveledUp: boolean;
}

export interface ProgressionState {
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string;
}

export const ProgressionEngine = {
  awardXp(state: ProgressionState, delta: number): XpResult {
    const newXp = Math.max(0, state.xp + delta);
    const newLevel = Math.max(1, Math.floor(newXp / GAME_CONFIG.LEVELS.XP_PER_LEVEL) + 1);
    return {
      xpDelta: delta,
      newXp,
      newLevel,
      leveledUp: newLevel > state.level,
    };
  },

  updateStreak(state: ProgressionState, now: Date): ProgressionState {
    const todayStr = now.toISOString().slice(0, 10);
    const lastStr = state.lastActiveDate
      ? new Date(state.lastActiveDate).toISOString().slice(0, 10)
      : null;

    if (lastStr === todayStr) return state;

    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().slice(0, 10);

    const newStreak = lastStr === yesterdayStr ? state.streak + 1 : 1;

    return { ...state, streak: newStreak, lastActiveDate: todayStr };
  },
};
