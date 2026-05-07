import type { DifficultyLevel } from './card.types';

export interface AnonymousUser {
  uuid: string;
  createdAt: string;
  currentHobbyId: string;
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string;
  skillLevel: DifficultyLevel;
  dailyTimeMinutes: number;
}

export interface UserProgress {
  userId: string;
  hobbyId: string;
  masteredConcepts: string[];
  weakConcepts: string[];
  cardsSeen: number;
  cardsUnderstood: number;
  averageResponseTimeMs: number;
  currentDifficulty: DifficultyLevel;
}
