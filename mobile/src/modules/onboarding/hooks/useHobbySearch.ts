import { useState, useCallback, useEffect } from 'react';
import { useDebounce } from '../../../shared/hooks/useDebounce';
import { onboardingService } from '../services/onboarding.service';

export interface HobbySearchResult {
  id: string;
  name: string;
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
      const data = await onboardingService.searchHobbies(q);
      setResults(data.map((item) => ({ id: item.slug, name: item.name })));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // trigger search when debounced query changes
  useEffect(() => {
    void search(debouncedQuery);
  }, [debouncedQuery, search]);

  return { query, setQuery, results, isLoading };
};
