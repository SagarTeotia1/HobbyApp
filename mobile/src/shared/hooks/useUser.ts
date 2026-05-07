import { useUserStore } from '../../app/store/rootStore';

export function useUser() {
  const uuid = useUserStore((s) => s.uuid);
  const isOnboarded = useUserStore((s) => s.isOnboarded);
  const currentHobbyId = useUserStore((s) => s.currentHobbyId);
  return { uuid, isOnboarded, currentHobbyId };
}
