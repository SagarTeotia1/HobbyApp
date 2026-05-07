import { geminiClient } from '../../infrastructure/ai/gemini.client';
import { HobbyModel } from '../../models/Hobby.model';
import { buildHobbyValidationPrompt } from './prompts/hobbyValidation';
import { buildRoadmapPrompt } from './prompts/roadmapGeneration';
import { buildCardGenerationPrompt } from './prompts/cardGeneration';
import { buildSimplifyCardPrompt } from './prompts/simplifyCard';
import type { AIHobbySuggestion } from './ai.types';
import type { HobbySuggestInput, SimplifyCardInput } from './ai.validator';
import type { DifficultyLevel, LearningCardType } from '../../shared/types/common.types';

const SYSTEM_PROMPT_HOBBY = 'You are HobbyForge\'s onboarding assistant. Output strict JSON only.';
const SYSTEM_PROMPT_SIMPLIFY = 'You are HobbyForge\'s tutor. Simplify concepts for the learner. Output strict JSON only.';
const SYSTEM_PROMPT_ROADMAP = 'You are HobbyForge\'s roadmap generator. Output strict JSON only.';
const SYSTEM_PROMPT_CARD = 'You are HobbyForge\'s flashcard generator. Output strict JSON only.';
const SYSTEM_PROMPT_CHAT = 'You are HobbyForge\'s AI tutor. Answer concisely (max 120 words) in plain prose.';

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
    const result = await geminiClient.generateJSON<RoadmapResult>(SYSTEM_PROMPT_ROADMAP, userPrompt);
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
    const result = await geminiClient.generateJSON<GeneratedCard[]>(SYSTEM_PROMPT_CARD, userPrompt);

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
