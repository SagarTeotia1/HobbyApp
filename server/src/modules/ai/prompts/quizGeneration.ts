import type { DifficultyLevel } from '../../../shared/types/common.types';

export interface QuizGenerationPromptParams {
  hobby: string;
  level: DifficultyLevel;
  conceptIds: string[];
  count: number;
}

export const buildQuizGenerationPrompt = ({
  hobby,
  level,
  conceptIds,
  count,
}: QuizGenerationPromptParams): string => `Generate ${count} multiple-choice quiz questions for "${hobby}" at "${level}" level.
Concepts to test: ${conceptIds.join(', ')}.

Output STRICT JSON array. Each item:
{
  "question": string (max 140 chars),
  "options": string[] (exactly 4),
  "correctIndex": number (0-3),
  "explanation": string (max 200 chars),
  "xpReward": 10
}

No prose. No markdown. Only JSON.`;
