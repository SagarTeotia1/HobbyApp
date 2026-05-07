export interface ProgressSummary {
  xp: number;
  level: number;
  streak: number;
  cardsSeen: number;
  cardsUnderstood: number;
  weakConcepts: string[];
  masteredConcepts: string[];
}

export interface SessionSummary {
  sessionId: string;
  xpGained: number;
  cardsSeen: number;
  cardsUnderstood: number;
  cardsBookmarked: number;
  weakTopics: string[];
  totalXP: number;
  level: number;
  streak: number;
  completedAt: string;
}

export interface DashboardData {
  xp: number;
  level: number;
  streak: number;
  progressToNextLevel: number;
  cardsSeen: number;
  cardsUnderstood: number;
  weakConcepts: string[];
  masteredConcepts: string[];
  currentDifficulty: string;
}
