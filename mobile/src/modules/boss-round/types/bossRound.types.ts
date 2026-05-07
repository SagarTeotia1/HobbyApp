import type { BossQuestion } from '../../../shared/types/card.types';

export interface BossRoundSession {
  sessionId: string;
  questions: BossQuestion[];
}

export interface BossRoundResult {
  sessionId: string;
  userId: string;
  hobbyId: string;
  correctCount: number;
  wrongCount: number;
  xpGained: number;
  xpLost: number;
  netXP: number;
  maxCombo: number;
  didWin: boolean;
  completedAt: string;
}
