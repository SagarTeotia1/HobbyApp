import type { DifficultyLevel } from '../../../shared/types/card.types';

export const buildRoadmapPrompt = (p: {
  hobby: string;
  level: DifficultyLevel;
  dailyMinutes: number;
}): string =>
  `[client reference] Roadmap for ${p.hobby} at ${p.level} with ${p.dailyMinutes} min/day.`;
