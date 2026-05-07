import type { DifficultyLevel } from '../../shared/types/common.types';

export interface UserLearningProfile {
  userId: string;
  hobbyId: string;
  masteredConceptIds: string[];
  weakConceptIds: string[];
  averageResponseTimeMs: number;
  currentDifficulty: DifficultyLevel;
  cardsSeen: number;
}

export interface RecommendationContext {
  profile: UserLearningProfile;
  recentCardIds: string[];
  sessionCardCount: number;
}

export interface CardRecommendation {
  conceptId: string;
  cardType: string;
  priority: number;
  reason: 'weak_topic' | 'new_concept' | 'spaced_repetition' | 'boss_prep';
}
