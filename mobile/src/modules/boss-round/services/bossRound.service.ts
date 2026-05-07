import { apiClient, unwrap } from '../../../shared/services/api.client';
import type { ApiEnvelope } from '../../../shared/types/api.types';
import type { BossQuestion } from '../../../shared/types/card.types';

export interface BossRoundStartResponse {
  sessionId: string;
  questions: BossQuestion[];
}

export interface BossRoundSubmitPayload {
  sessionId: string;
  answers: { questionId: string; selectedIndex: number; timeMs: number }[];
}

export interface BossRoundResult {
  correctCount: number;
  wrongCount: number;
  xpGained: number;
  xpLost: number;
  maxCombo: number;
}

export const bossRoundService = {
  async start(hobbyId: string): Promise<BossRoundStartResponse> {
    return unwrap(
      apiClient.post<ApiEnvelope<BossRoundStartResponse>>('/boss-round/start', { hobbyId }),
    );
  },

  async submit(payload: BossRoundSubmitPayload): Promise<BossRoundResult> {
    return unwrap(apiClient.post<ApiEnvelope<BossRoundResult>>('/boss-round/submit', payload));
  },
};
