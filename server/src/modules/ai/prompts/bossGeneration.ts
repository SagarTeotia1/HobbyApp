import type { DifficultyLevel } from '../../../shared/types/common.types';

export interface BossGenerationPromptParams {
  hobby: string;
  level: DifficultyLevel;
  conceptIds: string[];
  count: number;
}

export const buildBossGenerationPrompt = ({
  hobby,
  level,
  conceptIds,
  count,
}: BossGenerationPromptParams): string => `Generate ${count} HARD boss-round questions for "${hobby}" at "${level}" level.
Test deep understanding of: ${conceptIds.join(', ')}.

Each question must be more challenging than a regular quiz - require synthesis, edge cases, or applied scenarios.

Output STRICT JSON array. Each item:
{
  "question": string (max 180 chars),
  "options": string[] (exactly 4),
  "correctIndex": number (0-3),
  "explanation": string (max 240 chars),
  "xpReward": 10,
  "xpPenalty": 15,
  "timeLimit": 60
}

No prose. No markdown. Only JSON.`;
