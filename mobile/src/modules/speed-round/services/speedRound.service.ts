import { apiClient, unwrap } from '../../../shared/services/api.client';
import type { ApiEnvelope } from '../../../shared/types/api.types';
import type { QuizQuestion } from '../../../shared/types/card.types';

export interface SpeedRoundStartResponse {
  sessionId: string;
  questions: QuizQuestion[];
  durationSeconds: number;
}

export interface SpeedRoundSubmitPayload {
  sessionId: string;
  answers: { questionId: string; selectedIndex: number; timeMs: number }[];
}

export interface SpeedRoundResult {
  correctCount: number;
  xpGained: number;
}

export const speedRoundService = {
  async start(hobbyId: string): Promise<SpeedRoundStartResponse> {
    return unwrap(
      apiClient.post<ApiEnvelope<SpeedRoundStartResponse>>('/speed-round/start', { hobbyId }),
    );
  },

  async submit(payload: SpeedRoundSubmitPayload): Promise<SpeedRoundResult> {
    return unwrap(
      apiClient.post<ApiEnvelope<SpeedRoundResult>>('/speed-round/submit', payload),
    );
  },
};
