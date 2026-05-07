import { useState, useCallback } from 'react';
import { useDebounce } from '../../../shared/hooks/useDebounce';

export interface HobbySearchResult {
  id: string;
  name: string;
  emoji: string;
}

export const useHobbySearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<HobbySearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 400);

  const search = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setIsLoading(true);
    try {
      // TODO: call GET /hobbies/suggestions?q=debouncedQuery via onboarding.service
    } finally {
      setIsLoading(false);
    }
  }, []);

  // trigger search when debounced query changes
  useState(() => {
    void search(debouncedQuery);
  });

  return { query, setQuery, results, isLoading };
};
