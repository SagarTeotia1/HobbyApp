import { useMutation } from '@tanstack/react-query';
import { speedRoundService } from '../services/speedRound.service';

export function useSpeedRound() {
  const startMutation = useMutation({ mutationFn: speedRoundService.start });
  const submitMutation = useMutation({ mutationFn: speedRoundService.submit });
  return { startMutation, submitMutation };
}
