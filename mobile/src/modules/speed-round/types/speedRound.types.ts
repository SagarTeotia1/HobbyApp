import type { QuizQuestion } from '../../../shared/types/card.types';

export interface SpeedRoundSession {
  sessionId: string;
  questions: QuizQuestion[];
  durationSeconds: number;
}
