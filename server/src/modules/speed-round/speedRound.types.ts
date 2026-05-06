import type { QuizQuestion } from '../../shared/types/common.types';

export interface SpeedRoundStartResponse {
  sessionId: string;
  questions: QuizQuestion[];
  durationSeconds: number;
}

export interface SpeedRoundResultPayload {
  sessionId: string;
  answers: { questionId: string; selectedIndex: number; timeMs: number }[];
}

export interface SpeedRoundResultResponse {
  correctCount: number;
  xpGained: number;
}
