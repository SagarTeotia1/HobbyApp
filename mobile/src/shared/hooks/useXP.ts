import { useUserStore } from '../../app/store/rootStore';

export function useXP() {
  const xp = useUserStore((s) => s.xp);
  const level = useUserStore((s) => s.level);
  const addXP = useUserStore((s) => s.addXP);
  return { xp, level, addXP };
}
