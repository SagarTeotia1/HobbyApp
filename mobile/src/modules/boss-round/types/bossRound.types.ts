import type { BossQuestion } from '../../../shared/types/card.types';

export interface BossRoundSession {
  sessionId: string;
  questions: BossQuestion[];
}
