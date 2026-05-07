import { useQuery } from '@tanstack/react-query';
import { apiClient, unwrap } from '../../../shared/services/api.client';
import { queryKeys } from '../../../shared/constants/queryKeys';
import type { ApiEnvelope } from '../../../shared/types/api.types';
import type { AnonymousUser } from '../../../shared/types/user.types';

export function useDashboard() {
  return useQuery({
    queryKey: queryKeys.profile.me,
    queryFn: () => unwrap(apiClient.get<ApiEnvelope<AnonymousUser>>('/profile/me')),
  });
}
