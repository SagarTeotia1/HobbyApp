export interface HobbyValidationPromptParams {
  userInput: string;
  popularHobbies: string[];
}

export const buildHobbyValidationPrompt = ({
  userInput,
  popularHobbies,
}: HobbyValidationPromptParams): string => `You are HobbyForge's onboarding assistant.

The user said: "${userInput}"
Popular hobbies on the platform: ${popularHobbies.join(', ')}.

Suggest 3-5 hobbies that match the user's intent. Mix popular and niche options.

Output STRICT JSON:
{
  "suggestions": [
    { "slug": string, "name": string, "reason": string (max 80 chars) }
  ],
  "clarifyingQuestion": string | null
}

No prose. No markdown. Only JSON.`;
