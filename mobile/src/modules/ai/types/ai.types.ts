import type { DifficultyLevel } from '../../../shared/types/card.types';

export interface AIChatRequest {
  message: string;
  hobbyId: string;
  history: { role: 'user' | 'assistant'; content: string }[];
}

export interface AIHobbySuggestion {
  slug: string;
  name: string;
  reason: string;
}

export interface AIChatContext {
  hobbyId: string;
  skillLevel: DifficultyLevel;
}
