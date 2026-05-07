export const buildCardGenerationPrompt = (params: {
  hobby: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  conceptId: string;
}): string => `[client-side reference only]
Generate cards for ${params.hobby} (${params.level}) on concept ${params.conceptId}.`;
