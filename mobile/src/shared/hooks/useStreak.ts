import { useUserStore } from '../../app/store/rootStore';

export function useStreak() {
  const streak = useUserStore((s) => s.streak);
  return { streak };
}
