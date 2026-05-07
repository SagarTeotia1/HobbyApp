export interface SimplifyCardPromptParams {
  hobby: string;
  originalContent: string;
  userLevel: string;
}

export const buildSimplifyPrompt = ({
  hobby,
  originalContent,
  userLevel,
}: SimplifyCardPromptParams): string => `Re-explain this "${hobby}" concept in simpler terms for a ${userLevel} learner.

Original: "${originalContent}"

Output STRICT JSON:
{
  "simplifiedContent": string (max 280 chars, plain language, use analogies if helpful)
}

No prose. No markdown. Only JSON.`;

export const buildSimplifyCardPrompt = buildSimplifyPrompt;
