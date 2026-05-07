// Single source of truth for card / question / signal / user types.
// Mirrors mobile/src/shared/types/card.types.ts + user.types.ts. Edit together.

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export type LearningCardType =
  | 'concept'
  | 'memory_hook'
  | 'analogy'
  | 'mistake_fix'
  | 'boss_prep'
  | 'scenario'
  | 'recap';

export type CardInteraction =
  | 'understood'
  | 'needs_review'
  | 'needs_simpler'
  | 'bookmarked'
  | 'flipped'
  | 'skipped';

export interface LearningCard {
  id: string;
  hobbyId: string;
  type: LearningCardType;
  difficulty: DifficultyLevel;
  conceptId: string;
  title: string;
  frontContent: string;
  backContent: string;
  simplifiedContent?: string;
  tags: string[];
  estimatedReadSeconds: number;
  generatedAt: string;
}

export interface QuizQuestion {
  id: string;
  cardId: string;
  hobbyId: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
  difficulty: DifficultyLevel;
  xpReward: number;
}

export interface BossQuestion extends QuizQuestion {
  xpPenalty: number;
  timeLimitSeconds: number;
}

export interface LearningSignal {
  userId: string;
  hobbyId: string;
  cardId: string;
  interaction: CardInteraction;
  responseTimeMs: number;
  sessionId: string;
  timestamp: string;
}

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
