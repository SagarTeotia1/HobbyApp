import type {
  BossRoundStartResponse,
  BossRoundSubmitPayload,
  BossRoundResultResponse,
} from './bossRound.types';

export const bossRoundService = {
  async start(_userId: string, _hobbyId: string): Promise<BossRoundStartResponse> {
    throw new Error('bossRoundService.start not implemented');
  },

  async submit(_userId: string, _payload: BossRoundSubmitPayload): Promise<BossRoundResultResponse> {
    throw new Error('bossRoundService.submit not implemented');
  },
};
