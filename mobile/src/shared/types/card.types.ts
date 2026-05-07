export type LearningCardType =
  | 'concept'
  | 'quiz'
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
  | 'skipped';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface LearningCard {
  id: string;
  hobbyId: string;
  type: LearningCardType;
  title: string;
  content: string;
  simplifiedContent?: string;
  imageUrl?: string;
  tags: string[];
  difficulty: DifficultyLevel;
  conceptId: string;
  generatedAt: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  xpReward: number;
}

export interface BossQuestion extends QuizQuestion {
  xpPenalty: number;
  timeLimit: number;
}
