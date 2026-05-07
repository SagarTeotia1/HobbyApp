import type { QuizQuestion } from '../../shared/types/common.types';

export interface SpeedRoundStartResponse {
  sessionId: string;
  questions: QuizQuestion[];
  durationSeconds: number;
}

export interface SpeedRoundResultResponse {
  correctCount: number;
  xpGained: number;
}
