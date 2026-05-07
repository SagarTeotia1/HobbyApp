import { useMutation } from '@tanstack/react-query';
import { bossRoundService } from '../services/bossRound.service';

export function useBossRound() {
  const startMutation = useMutation({ mutationFn: bossRoundService.start });
  const submitMutation = useMutation({ mutationFn: bossRoundService.submit });
  return { startMutation, submitMutation };
}
