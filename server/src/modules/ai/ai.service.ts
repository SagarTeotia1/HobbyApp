import { nanoid } from 'nanoid';
import { geminiClient } from '../../infrastructure/ai/gemini.client';
import { groqClient } from '../../infrastructure/ai/groq.client';
import { env } from '../../config/env';
import { HobbyModel } from '../../models/Hobby.model';
import { buildHobbyValidationPrompt } from './prompts/hobbyValidation';
import { buildRoadmapPrompt } from './prompts/roadmapGeneration';
import { buildCardGenerationPrompt } from './prompts/cardGeneration';
import { buildQuizGenerationPrompt } from './prompts/quizGeneration';
import { buildSimplifyCardPrompt } from './prompts/simplifyCard';
import type { AIHobbySuggestion } from './ai.types';
import type { AIChatActionInput, HobbySuggestInput, SimplifyCardInput } from './ai.validator';
import type { DifficultyLevel, LearningCardType, QuizQuestion } from '../../shared/types/common.types';
import { GAME_CONFIG } from '../../shared/constants/gameConfig';
import { ApiError } from '../../shared/utils/ApiError';

const SYSTEM_PROMPT_HOBBY = 'You are HobbyForge\'s onboarding assistant. Output strict JSON only.';
const SYSTEM_PROMPT_SIMPLIFY = 'You are HobbyForge\'s tutor. Simplify concepts for the learner. Output strict JSON only.';
const SYSTEM_PROMPT_ROADMAP = 'You are HobbyForge\'s roadmap generator. Output strict JSON only.';
const SYSTEM_PROMPT_CARD = 'You are HobbyForge\'s flashcard generator. Output strict JSON only.';
const SYSTEM_PROMPT_CHAT = 'You are HobbyForge\'s AI tutor. Answer concisely (max 120 words) in plain prose.';
const SYSTEM_PROMPT_SPEED_QUIZ = 'You are HobbyForge\'s speed-round quiz generator. Generate EASY, simple questions answerable in under 5 seconds. Use plain language. Avoid trick questions. Output strict JSON only.';

type RoadmapStage = {
  order: number;
  conceptId: string;
  title: string;
  description: string;
};

type RoadmapResult = { stages: RoadmapStage[] };

type GeneratedCard = {
  type: LearningCardType;
  title: string;
  content: string;
  tags: string[];
  conceptId: string;
};

async function generateJSONWithProviders<T>(systemPrompt: string, userPrompt: string): Promise<T> {
  const runGroq = async (): Promise<T> => groqClient.generateJSON<T>(systemPrompt, userPrompt);
  const runGemini = async (): Promise<T> => geminiClient.generateJSON<T>(systemPrompt, userPrompt);

  const primary = env.AI_PROVIDER === 'groq' ? runGroq : runGemini;
  const fallback = env.AI_FALLBACK_PROVIDER === 'groq' ? runGroq : runGemini;

  try {
    return await primary();
  } catch {
    if (env.AI_FALLBACK_PROVIDER === env.AI_PROVIDER) {
      throw new ApiError(500, 'AI_PROVIDER_ERROR', 'Primary AI provider failed and fallback is same as primary');
    }
    return fallback();
  }
}

export const aiService = {
  async validateHobby(name: string): Promise<{ isValid: boolean; normalizedName: string; slug: string }> {
    const trimmed = name.trim();
    if (!trimmed) return { isValid: false, normalizedName: '', slug: '' };

    const normalizedName = trimmed
      .split(/\s+/)
      .map((part) => part[0].toUpperCase() + part.slice(1).toLowerCase())
      .join(' ');
    const slug = normalizedName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const existing = await HobbyModel.findOne({ slug }).lean();
    if (existing) {
      return { isValid: true, normalizedName: existing.name, slug: existing.slug };
    }

    return { isValid: slug.length > 1, normalizedName, slug };
  },

  async generateRoadmap(input: {
    hobby: string;
    level: DifficultyLevel;
    dailyMinutes: number;
  }): Promise<RoadmapStage[]> {
    const userPrompt = buildRoadmapPrompt({
      hobby: input.hobby,
      level: input.level,
      dailyMinutes: input.dailyMinutes,
    });
    const result = await generateJSONWithProviders<RoadmapResult>(SYSTEM_PROMPT_ROADMAP, userPrompt);
    return result.stages;
  },

  async generateCards(input: {
    hobby: string;
    hobbyId: string;
    level: DifficultyLevel;
    conceptId: string;
    count: number;
    previousCards?: string[];
    userWeaknesses?: string[];
  }): Promise<
    Array<{
      hobbyId: string;
      type: LearningCardType;
      difficulty: DifficultyLevel;
      conceptId: string;
      title: string;
      frontContent: string;
      backContent: string;
      tags: string[];
      estimatedReadSeconds: number;
      generatedAt: Date;
    }>
  > {
    const userPrompt = buildCardGenerationPrompt({
      hobby: input.hobby,
      level: input.level,
      conceptId: input.conceptId,
      previousCards: input.previousCards ?? [],
      userWeaknesses: input.userWeaknesses ?? [],
      count: input.count,
    });
    const result = await generateJSONWithProviders<GeneratedCard[]>(SYSTEM_PROMPT_CARD, userPrompt);

    return result.map((card) => ({
      hobbyId: input.hobbyId,
      type: card.type,
      difficulty: input.level,
      conceptId: card.conceptId || input.conceptId,
      title: card.title,
      frontContent: card.content,
      backContent: `Quick recap: ${card.content}`,
      tags: card.tags,
      estimatedReadSeconds: 30,
      generatedAt: new Date(),
    }));
  },

  async generateSpeedRoundQuestions(input: {
    hobby: string;
    hobbyId: string;
    level: DifficultyLevel;
    conceptIds: string[];
    count: number;
  }): Promise<QuizQuestion[]> {
    type RawQuestion = {
      question: string;
      options: [string, string, string, string];
      correctIndex: 0 | 1 | 2 | 3;
      explanation: string;
      xpReward?: number;
    };

    const userPrompt = buildQuizGenerationPrompt({
      hobby: input.hobby,
      level: 'beginner',
      conceptIds: input.conceptIds,
      count: input.count,
    });

    let rawList: RawQuestion[];
    try {
      rawList = await generateJSONWithProviders<RawQuestion[]>(SYSTEM_PROMPT_SPEED_QUIZ, userPrompt);
    } catch {
      rawList = input.conceptIds.slice(0, input.count).map((cid) => ({
        question: `What is a key idea in "${cid.replace(/_/g, ' ')}"?`,
        options: ['Foundation concept', 'Advanced theory', 'Unrelated topic', 'Not applicable'] as [string, string, string, string],
        correctIndex: 0 as const,
        explanation: 'Foundation concepts are the building blocks.',
        xpReward: GAME_CONFIG.SPEED_ROUND.XP_PER_CORRECT,
      }));
    }

    return rawList.map((q) => ({
      id: nanoid(),
      cardId: input.hobbyId,
      hobbyId: input.hobbyId,
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      explanation: q.explanation,
      difficulty: 'beginner' as DifficultyLevel,
      xpReward: q.xpReward ?? GAME_CONFIG.SPEED_ROUND.XP_PER_CORRECT,
    }));
  },

  async suggestHobbies(input: HobbySuggestInput): Promise<{
    suggestions: AIHobbySuggestion[];
    clarifyingQuestion: string | null;
  }> {
    const userPrompt = buildHobbyValidationPrompt({
      userInput: input.query,
      popularHobbies: ['Chess', 'Guitar', 'Photography', 'Cooking', 'Drawing'],
    });
    return generateJSONWithProviders(SYSTEM_PROMPT_HOBBY, userPrompt);
  },

  async simplifyCard(_userId: string, _input: SimplifyCardInput): Promise<{ simplifiedContent: string }> {
    try {
      const userPrompt = buildSimplifyCardPrompt({
        hobby: 'general',
        originalContent: 'Explain the key idea with simpler language and one example.',
        userLevel: 'beginner',
      });
      return await generateJSONWithProviders(SYSTEM_PROMPT_SIMPLIFY, userPrompt);
    } catch {
      return {
        simplifiedContent:
          'Here is a simpler version: focus on one small step, practice it once, then repeat with a tiny variation.',
      };
    }
  },

  streamChat(userMessage: string, hobby: string): AsyncGenerator<string> {
    const systemPrompt = `${SYSTEM_PROMPT_CHAT}\nThe learner is working on "${hobby}".`;
    return geminiClient.streamText(systemPrompt, [], userMessage);
  },

  async chatAction(input: AIChatActionInput): Promise<{ success: boolean; changes: Record<string, unknown> }> {
    return {
      success: true,
      changes: {
        intent: input.intent,
        payload: input.payload,
        userId: input.userId,
      },
    };
  },
};
