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
  awardXp(_state: ProgressionState, _delta: number): XpResult {
    throw new Error('ProgressionEngine.awardXp not implemented');
  },

  updateStreak(_state: ProgressionState, _now: Date): ProgressionState {
    throw new Error('ProgressionEngine.updateStreak not implemented');
  },
};
