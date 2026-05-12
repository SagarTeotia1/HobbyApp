import { useState, useCallback } from 'react';
import { aiService } from '../../ai/services/ai.service';

export interface HobbySuggestion {
  slug: string;
  name: string;
}

export function useHobbySearch() {
  const [suggestions, setSuggestions] = useState<HobbySuggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) { setSuggestions([]); return; }
    setIsSearching(true);
    try {
      const result = await aiService.suggestHobbies(query);
      setSuggestions(
        result.suggestions.slice(0, 4).map((s) => ({ slug: s.slug, name: s.name })),
      );
    } catch (e) {
      console.warn('[useHobbySearch] Failed to fetch suggestions:', e);
      setSuggestions([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const clear = useCallback(() => setSuggestions([]), []);

  return { suggestions, isSearching, search, clear };
}
