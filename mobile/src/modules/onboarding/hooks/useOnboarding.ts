import { useMutation } from '@tanstack/react-query';
import { onboardingService, type OnboardingPayload } from '../services/onboarding.service';
import { useUserStore } from '../../../app/store/rootStore';

export function useOnboarding() {
  const setAuth = useUserStore((s) => s.setAuth);
  const setHobby = useUserStore((s) => s.setHobby);
  const setOnboarded = useUserStore((s) => s.setOnboarded);

  return useMutation({
    mutationFn: (payload: OnboardingPayload) => onboardingService.submit(payload),
    onSuccess: (data, variables) => {
      setAuth(data.uuid, data.jwt);
      setHobby(variables.hobbySlug);
      setOnboarded(true);
    },
  });
}
