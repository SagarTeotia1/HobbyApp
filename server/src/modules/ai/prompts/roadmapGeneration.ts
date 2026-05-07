import type { DifficultyLevel } from '../../../shared/types/common.types';

export interface RoadmapGenerationParams {
  hobby: string;
  level: DifficultyLevel;
  dailyMinutes: number;
}

export const buildRoadmapPrompt = ({
  hobby,
  level,
  dailyMinutes,
}: RoadmapGenerationParams): string =>
  `You are HobbyForge AI. Generate a personalized learning roadmap for "${hobby}" at ${level} level.

The user can dedicate ${dailyMinutes} minutes per day.

Output STRICT JSON. Shape:
{
  "stages": [
    {
      "order": number (0-indexed),
      "conceptId": string (snake_case, unique),
      "title": string (max 40 chars),
      "description": string (max 120 chars, what they will learn)
    }
  ]
}

Rules:
- 6 to 10 stages total, ordered from foundational to advanced.
- Concepts must be specific to "${hobby}", not generic.
- No prose. No markdown. Only JSON.`;
