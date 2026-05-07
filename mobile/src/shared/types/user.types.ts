import type { DifficultyLevel } from './card.types';

export interface UserPreferences {
  dailyMinutes: 5 | 10 | 15 | 30 | 60;
  skillLevel: DifficultyLevel;
}

export interface AnonymousUser {
  uuid: string;
  currentHobbyId: string;
  xp: number;
  level: number;
  streak: number;
  lastActiveDateISO: string;
  preferences: UserPreferences;
  createdAt: string;
}

export interface UserProgress {
  userId: string;
  hobbyId: string;
  totalCardsSeenCount: number;
  totalCardsUnderstoodCount: number;
  masteredConceptIds: string[];
  weakConceptIds: string[];
  averageResponseTimeMs: number;
  currentDifficulty: DifficultyLevel;
  currentStageId: string;
}
