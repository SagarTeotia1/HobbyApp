import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../shared/constants/queryKeys';
import { dashboardService } from '../services/dashboard.service';

export function useDashboard(hobbyId: string | null) {
  return useQuery({
    queryKey: hobbyId ? queryKeys.progress.dashboard(hobbyId) : ['dashboard', 'idle'],
    queryFn: () => dashboardService.get(hobbyId!),
    enabled: !!hobbyId,
    staleTime: 1000 * 30,
  });
}
