import type { DifficultyLevel } from '../../../shared/types/common.types';

export interface CardGenerationPromptParams {
  hobby: string;
  level: DifficultyLevel;
  conceptId: string;
  previousCards: string[];
  userWeaknesses: string[];
  count: number;
}

export const buildCardGenerationPrompt = ({
  hobby,
  level,
  conceptId,
  previousCards,
  userWeaknesses,
  count,
}: CardGenerationPromptParams): string => `You are HobbyForge, an adaptive AI tutor.

Generate ${count} micro-learning flashcards for the hobby "${hobby}" at "${level}" level focused on the concept "${conceptId}".

User has shown weakness in: ${userWeaknesses.join(', ') || 'none'}.
Recently seen cards (avoid repetition): ${previousCards.slice(-10).join(', ') || 'none'}.

Output STRICT JSON array. Each item:
{
  "type": "concept" | "memory_hook" | "analogy" | "mistake_fix" | "scenario" | "recap",
  "title": string (max 60 chars),
  "content": string (max 280 chars, rich, dopamine-friendly),
  "tags": string[] (3-6 tags),
  "conceptId": "${conceptId}"
}

No prose. No markdown. Only JSON.`;
