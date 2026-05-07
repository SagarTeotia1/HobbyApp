import { geminiClient } from '../../infrastructure/ai/gemini.client';
import { buildHobbyValidationPrompt } from './prompts/hobbyValidation';
import { buildSimplifyCardPrompt } from './prompts/simplifyCard';
import type { AIHobbySuggestion } from './ai.types';
import type { HobbySuggestInput, SimplifyCardInput } from './ai.validator';

const SYSTEM_PROMPT_HOBBY = 'You are HobbyForge\'s onboarding assistant. Output strict JSON only.';
const SYSTEM_PROMPT_SIMPLIFY = 'You are HobbyForge\'s tutor. Simplify concepts for the learner. Output strict JSON only.';
const SYSTEM_PROMPT_CHAT = 'You are HobbyForge\'s AI tutor. Answer concisely (max 120 words) in plain prose.';

export const aiService = {
  async suggestHobbies(input: HobbySuggestInput): Promise<{
    suggestions: AIHobbySuggestion[];
    clarifyingQuestion: string | null;
  }> {
    const userPrompt = buildHobbyValidationPrompt({
      userInput: input.query,
      popularHobbies: ['Chess', 'Guitar', 'Photography', 'Cooking', 'Drawing'],
    });
    return geminiClient.generateJSON(SYSTEM_PROMPT_HOBBY, userPrompt);
  },

  async simplifyCard(_userId: string, _input: SimplifyCardInput): Promise<{ simplifiedContent: string }> {
    const userPrompt = buildSimplifyCardPrompt({
      hobby: 'placeholder',
      originalContent: 'placeholder',
      userLevel: 'beginner',
    });
    return geminiClient.generateJSON(SYSTEM_PROMPT_SIMPLIFY, userPrompt);
  },

  streamChat(userMessage: string, hobby: string): AsyncGenerator<string> {
    const systemPrompt = `${SYSTEM_PROMPT_CHAT}\nThe learner is working on "${hobby}".`;
    return geminiClient.streamText(systemPrompt, [], userMessage);
  },
};
