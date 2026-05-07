import { useState } from 'react';

export function useAISuggestions() {
  const [suggestions, setSuggestions] = useState<string[]>([
    'Suggest a hobby for me',
    'Make this simpler',
    'Quiz me',
  ]);
  return { suggestions, setSuggestions };
}
