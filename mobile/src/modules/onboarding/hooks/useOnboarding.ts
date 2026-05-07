import { useMutation } from '@tanstack/react-query';
import { onboardingService, type CompleteOnboardingPayload } from '../services/onboarding.service';
import { useUserStore } from '../../../app/store/rootStore';

export function useOnboarding() {
  const jwt = useUserStore((s) => s.jwt);
  const setAuth = useUserStore((s) => s.setAuth);
  const setHobby = useUserStore((s) => s.setHobby);
  const setPreferences = useUserStore((s) => s.setPreferences);
  const setOnboarded = useUserStore((s) => s.setOnboarded);

  return useMutation({
    mutationFn: async (payload: CompleteOnboardingPayload) => {
      if (!jwt) {
        const init = await onboardingService.init();
        setAuth(init.user.uuid, init.token);
      }
      return onboardingService.complete(payload);
    },
    onSuccess: (_data, variables) => {
      setHobby(variables.hobbySlug);
      setPreferences(variables.dailyMinutes, variables.skillLevel);
      setOnboarded(true);
    },
  });
}
