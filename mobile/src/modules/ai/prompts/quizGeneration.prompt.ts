export const buildQuizGenerationPrompt = (hobby: string, count: number): string =>
  `[client reference] Quiz me on ${hobby} (${count} questions).`;
