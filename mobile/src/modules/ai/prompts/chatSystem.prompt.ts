import type { DifficultyLevel } from '../../../shared/types/card.types';

export const buildChatSystemPrompt = (p: {
  hobby: string;
  level: DifficultyLevel;
  currentScreen: string;
  weakConceptTitles: string[];
}): string =>
  `[client reference] System prompt for ${p.hobby} tutor at ${p.level} level on screen ${p.currentScreen}. Weak areas: ${p.weakConceptTitles.join(', ') || 'none'}.`;
