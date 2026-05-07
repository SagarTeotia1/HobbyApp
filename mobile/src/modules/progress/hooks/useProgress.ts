import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../shared/constants/queryKeys';
import { progressService } from '../services/progress.service';

export function useProgressSummary(hobbyId: string | null) {
  return useQuery({
    queryKey: hobbyId ? queryKeys.progress.summary(hobbyId) : ['progress', 'idle'],
    queryFn: () => progressService.getSummary(hobbyId!),
    enabled: !!hobbyId,
    staleTime: 1000 * 30,
  });
}

export function useProgressSession(sessionId: string | null) {
  return useQuery({
    queryKey: sessionId ? queryKeys.progress.session(sessionId) : ['progress', 'session', 'idle'],
    queryFn: () => progressService.getSession(sessionId!),
    enabled: !!sessionId,
    staleTime: Infinity,
  });
}

export function useProgressDashboard(hobbyId: string | null) {
  return useQuery({
    queryKey: hobbyId ? queryKeys.progress.dashboard(hobbyId) : ['progress', 'dashboard', 'idle'],
    queryFn: () => progressService.getDashboard(hobbyId!),
    enabled: !!hobbyId,
    staleTime: 1000 * 30,
  });
}
