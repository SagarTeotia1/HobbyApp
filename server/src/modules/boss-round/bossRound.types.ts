import type { BossQuestion } from '../../shared/types/common.types';

export interface BossRoundStartResponse {
  sessionId: string;
  questions: BossQuestion[];
}

export interface BossRoundAnswer {
  questionId: string;
  selectedIndex: number;
  timeMs: number;
}

export interface BossRoundSubmitPayload {
  sessionId: string;
  answers: BossRoundAnswer[];
}

export interface BossRoundResultResponse {
  correctCount: number;
  wrongCount: number;
  xpGained: number;
  xpLost: number;
  maxCombo: number;
}
