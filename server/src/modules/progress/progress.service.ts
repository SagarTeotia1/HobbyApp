import type { ProgressSummary } from './progress.types';

export const progressService = {
  async getSummary(_userId: string, _hobbyId: string): Promise<ProgressSummary> {
    throw new Error('progressService.getSummary not implemented');
  },
};
