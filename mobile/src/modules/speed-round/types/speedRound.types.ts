import type { QuizQuestion } from '../../../shared/types/card.types';

export interface SpeedRoundSession {
  sessionId: string;
  questions: QuizQuestion[];
  durationSeconds: number;
}

export interface SpeedRoundResult {
  sessionId: string;
  userId: string;
  hobbyId: string;
  correctCount: number;
  totalAnswered: number;
  durationSeconds: number;
  xpEarned: number;
  completedAt: string;
}
