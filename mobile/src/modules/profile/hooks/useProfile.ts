import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService, type UpdateProfileInput } from '../services/profile.service';
import { queryKeys } from '../../../shared/constants/queryKeys';

export function useProfile() {
  const qc = useQueryClient();

  const profileQuery = useQuery({
    queryKey: queryKeys.profile.me,
    queryFn: profileService.getMe,
  });

  const updateMutation = useMutation({
    mutationFn: (input: UpdateProfileInput) => profileService.update(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.profile.me });
    },
  });

  return { profileQuery, updateMutation };
}
