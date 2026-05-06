import { generateJson, generateStream } from '../../infrastructure/ai/gemini.client';
import { buildHobbyOnboardingPrompt } from './prompts/hobbyOnboarding';
import { buildSimplifyCardPrompt } from './prompts/simplifyCard';
import type { AIHobbySuggestion } from './ai.types';
import type { HobbySuggestInput, SimplifyCardInput } from './ai.validator';

export const aiService = {
  async suggestHobbies(input: HobbySuggestInput): Promise<{
    suggestions: AIHobbySuggestion[];
    clarifyingQuestion: string | null;
  }> {
    const prompt = buildHobbyOnboardingPrompt({
      userInput: input.query,
      popularHobbies: ['Chess', 'Guitar', 'Photography', 'Cooking', 'Drawing'],
    });
    return generateJson({ prompt });
  },

  async simplifyCard(_userId: string, _input: SimplifyCardInput): Promise<{ simplifiedContent: string }> {
    const prompt = buildSimplifyCardPrompt({
      hobby: 'placeholder',
      originalContent: 'placeholder',
      userLevel: 'beginner',
    });
    return generateJson({ prompt });
  },

  streamChat(userMessage: string, hobby: string): AsyncGenerator<string> {
    const prompt = `You are HobbyForge's AI tutor for "${hobby}". Answer concisely (max 120 words) in plain prose:\n\n${userMessage}`;
    return generateStream(prompt);
  },
};
