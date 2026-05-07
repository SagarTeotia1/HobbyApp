// Single source of truth for card / question / signal types.
// Mirrors server/src/shared/types/common.types.ts. Edit both together.

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export type LearningCardType =
  | 'concept'        // core knowledge explanation
  | 'memory_hook'    // mnemonic / memorable trick
  | 'analogy'        // relates concept to something known
  | 'mistake_fix'    // corrects a common misconception
  | 'boss_prep'      // harder card, prepares for boss round
  | 'scenario'       // real-world application
  | 'recap';         // summary of previous cards

export type CardInteraction =
  | 'understood'     // right swipe
  | 'needs_review'   // left swipe
  | 'needs_simpler'  // long press → AI simplifies
  | 'bookmarked'     // bookmark tapped
  | 'flipped'        // card tapped to flip
  | 'skipped';       // navigated away mid-card

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
