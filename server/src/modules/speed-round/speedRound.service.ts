import type {
  SpeedRoundStartResponse,
  SpeedRoundResultPayload,
  SpeedRoundResultResponse,
} from './speedRound.types';

export const speedRoundService = {
  async start(_userId: string, _hobbyId: string): Promise<SpeedRoundStartResponse> {
    throw new Error('speedRoundService.start not implemented');
  },

  async submit(_userId: string, _payload: SpeedRoundResultPayload): Promise<SpeedRoundResultResponse> {
    throw new Error('speedRoundService.submit not implemented');
  },
};
