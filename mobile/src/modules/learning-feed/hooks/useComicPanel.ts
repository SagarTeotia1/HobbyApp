import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { comicService } from '../services/comic.service';
import { queryKeys } from '../../../shared/constants/queryKeys';

const TOTAL_PAGES = 5;

interface Params {
  hobbyId: string;
  topicId: string;
  topicName: string;
  hobbyName: string;
  enabled?: boolean;
}

export function useComicPanel({ hobbyId, topicId, topicName, hobbyName, enabled = true }: Params) {
  const [page, setPage] = useState(1);

  const query = useQuery({
    queryKey: queryKeys.comic.panel(hobbyId, topicId, page),
    queryFn: () => comicService.getPanel({ hobbyId, topicId, topicName, hobbyName, page }),
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: 1,
    enabled,
  });

  const goNext = () => setPage((p) => Math.min(p + 1, TOTAL_PAGES));
  const goPrev = () => setPage((p) => Math.max(p - 1, 1));

  return {
    ...query,
    page,
    totalPages: TOTAL_PAGES,
    goNext,
    goPrev,
  };
}
