import { geminiClient } from '../../infrastructure/ai/gemini.client';
import { groqClient } from '../../infrastructure/ai/groq.client';
import { env } from '../../config/env';
import { HobbyModel } from '../../models/Hobby.model';
import { buildHobbyValidationPrompt } from './prompts/hobbyValidation';
import { buildRoadmapPrompt } from './prompts/roadmapGeneration';
import { buildCardGenerationPrompt } from './prompts/cardGeneration';
import { buildSimplifyCardPrompt } from './prompts/simplifyCard';
import { buildChatSystemPrompt } from './prompts/chatSystem';
import type { AIHobbySuggestion } from './ai.types';
import type { AIChatInput, AIChatActionInput, HobbySuggestInput } from './ai.validator';
import { UserModel } from '../../models/User.model';
import { UserProgressModel } from '../../models/UserProgress.model';
import type { DifficultyLevel, LearningCardType } from '../../shared/types/common.types';
import { ApiError } from '../../shared/utils/ApiError';

const SYSTEM_PROMPT_HOBBY = 'You are HobbyForge\'s onboarding assistant. Output strict JSON only.';
const SYSTEM_PROMPT_SIMPLIFY = 'You are HobbyForge\'s tutor. Simplify concepts for the learner. Output strict JSON only.';
const SYSTEM_PROMPT_ROADMAP = 'You are HobbyForge\'s roadmap generator. Output strict JSON only.';
const SYSTEM_PROMPT_CARD = 'You are HobbyForge\'s flashcard generator. Output strict JSON only.';
const SYSTEM_PROMPT_VIDEO_TITLE = 'You are HobbyForge\'s content curator. Output strict JSON only.';

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
  // Generic JSON generation — used by other modules that need AI without coupling to specific prompts
  async generateRawJSON<T>(systemPrompt: string, userPrompt: string): Promise<T> {
    return generateJSONWithProviders<T>(systemPrompt, userPrompt);
  },

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

  async normalizeHobby(rawInput: string): Promise<{ slug: string; name: string }> {
    const systemPrompt =
      'You are a hobby name normalizer. Given any hobby input (typos, slang, overly specific variants), ' +
      'return the canonical hobby name and a URL-safe slug. ' +
      'IMPORTANT RULES:\n' +
      '1. Only normalize when the hobby is clearly identifiable. Examples: "electric guitar" → guitar, "oil painting" → painting, "surfboarding" → surfing.\n' +
      '2. Do NOT make semantic leaps for vague or generic words. If the input is ambiguous (e.g. "learning", "stuff", "things", "hobby"), return it cleaned up as-is — do NOT guess a specific hobby.\n' +
      '3. Never map generic English words to specific technical hobbies (e.g. "learning" must NOT become "ai-ml" or "machine-learning").\n' +
      'Output strict JSON only: { "slug": "kebab-case", "name": "Display Name" }';
    const userPrompt = `Normalize this hobby: "${rawInput}"`;
    try {
      return await generateJSONWithProviders<{ slug: string; name: string }>(systemPrompt, userPrompt);
    } catch {
      // Fallback: clean up the raw input ourselves
      const name = rawInput
        .split(/[-_\s]+/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return { slug, name };
    }
  },

  async generateYouTubeSearchQuery(
    hobbyName: string,
    topicName: string,
    skillLevel: string,
  ): Promise<string> {
    const systemPrompt = 'You are a YouTube search query optimizer. Output strict JSON only: { "query": "..." }';
    const userPrompt =
      `Generate the best YouTube search query to find a high-quality, embeddable tutorial video about "${topicName}" within "${hobbyName}" for a ${skillLevel} learner. ` +
      'Make it specific enough to surface educational content but broad enough to get results. ' +
      'Output strict JSON: { "query": "..." }';
    try {
      const result = await generateJSONWithProviders<{ query: string }>(systemPrompt, userPrompt);
      return result.query?.trim() || `${hobbyName} ${topicName} ${skillLevel} tutorial`;
    } catch {
      return `${hobbyName} ${topicName} ${skillLevel} tutorial`;
    }
  },

  async generateVideoTitle(hobbyName: string, videoUrl: string): Promise<{ title: string; creator: string }> {
    const userPrompt =
      `A learner is studying "${hobbyName}". They are about to watch a video from this URL: ${videoUrl}\n` +
      `Generate a short, engaging video title (max 8 words) that sounds relevant to learning ${hobbyName}. ` +
      `Also generate a plausible creator name (a real-sounding educator or channel).\n` +
      'Output strict JSON: { "title": "...", "creator": "..." }';
    try {
      return await generateJSONWithProviders<{ title: string; creator: string }>(SYSTEM_PROMPT_VIDEO_TITLE, userPrompt);
    } catch {
      return { title: `${hobbyName} Fundamentals`, creator: 'HobbyForge' };
    }
  },

  async simplifyCard(input: {
    hobby: string;
    originalContent: string;
    userLevel: DifficultyLevel;
  }): Promise<{ simplifiedContent: string }> {
    try {
      const userPrompt = buildSimplifyCardPrompt({
        hobby: input.hobby,
        originalContent: input.originalContent,
        userLevel: input.userLevel,
      });
      return await generateJSONWithProviders(SYSTEM_PROMPT_SIMPLIFY, userPrompt);
    } catch {
      return {
        simplifiedContent:
          'Here is a simpler version: focus on one small step, practice it once, then repeat with a tiny variation.',
      };
    }
  },

  streamChat(input: AIChatInput): AsyncGenerator<string> {
    const systemPrompt = buildChatSystemPrompt({
      hobby: input.hobbyId,
      level: input.level,
      currentScreen: input.currentScreen,
      weakConceptTitles: input.weakConcepts,
    });
    const history = input.history.map((m) => ({
      role: (m.role === 'assistant' ? 'model' : 'user') as 'user' | 'model',
      parts: [{ text: m.content }] as [{ text: string }],
    }));
    return geminiClient.streamText(systemPrompt, history, input.message);
  },

  async chatReply(input: AIChatInput): Promise<string> {
    const systemPrompt = buildChatSystemPrompt({
      hobby: input.hobbyId,
      level: input.level,
      currentScreen: input.currentScreen,
      weakConceptTitles: input.weakConcepts,
    });

    const geminiHistory = input.history.map((m) => ({
      role: (m.role === 'assistant' ? 'model' : 'user') as 'user' | 'model',
      parts: [{ text: m.content }] as [{ text: string }],
    }));

    const runGemini = async (): Promise<string> => {
      let reply = '';
      for await (const chunk of geminiClient.streamText(systemPrompt, geminiHistory, input.message)) {
        reply += chunk;
      }
      return reply || 'I had trouble generating a response. Please try again.';
    };

    if (env.AI_PROVIDER === 'groq') {
      try {
        const groqResult = await Promise.race([
          groqClient.generateText(systemPrompt, input.history, input.message),
          new Promise<string>((_, reject) =>
            setTimeout(() => reject(new Error('groq timeout after 8s')), 8_000),
          ),
        ]);
        if (groqResult) return groqResult;
        throw new Error('empty groq response');
      } catch (err) {
        console.warn('[chatReply] Groq failed, falling back to Gemini:', err instanceof Error ? err.message : err);
      }
    }

    try {
      const geminiResult = await Promise.race([
        runGemini(),
        new Promise<string>((_, reject) =>
          setTimeout(() => reject(new Error('gemini timeout after 25s')), 25_000),
        ),
      ]);
      return geminiResult;
    } catch (err) {
      console.warn('[chatReply] Gemini fallback also failed:', err instanceof Error ? err.message : err);
      return 'Both AI providers are currently unavailable. Please try again in a moment.';
    }
  },

  async chatAction(
    input: AIChatActionInput,
  ): Promise<{ success: boolean; changes: Record<string, unknown> }> {
    const DIFFICULTY_ORDER: DifficultyLevel[] = ['beginner', 'intermediate', 'advanced'];

    switch (input.intent) {
      case 'change_hobby': {
        const newHobbyId = typeof input.payload['hobbyId'] === 'string' ? input.payload['hobbyId'] : null;
        if (!newHobbyId) throw new ApiError(400, 'INVALID_PAYLOAD', 'change_hobby requires payload.hobbyId');
        await UserModel.updateOne({ uuid: input.userId }, { currentHobbyId: newHobbyId });
        return { success: true, changes: { intent: 'change_hobby', hobbyId: newHobbyId } };
      }

      case 'make_harder':
      case 'make_easier': {
        const user = await UserModel.findOne({ uuid: input.userId }).lean();
        if (!user?.currentHobbyId) throw new ApiError(404, 'USER_NOT_FOUND', 'User has no active hobby');
        const progress = await UserProgressModel.findOne({ userId: input.userId, hobbyId: user.currentHobbyId }).lean();
        const current = (progress?.currentDifficulty ?? 'beginner') as DifficultyLevel;
        const idx = DIFFICULTY_ORDER.indexOf(current);
        const nextIdx = input.intent === 'make_harder'
          ? Math.min(idx + 1, DIFFICULTY_ORDER.length - 1)
          : Math.max(idx - 1, 0);
        const newDifficulty = DIFFICULTY_ORDER[nextIdx];
        await UserProgressModel.updateOne(
          { userId: input.userId, hobbyId: user.currentHobbyId },
          { currentDifficulty: newDifficulty },
          { upsert: true },
        );
        return { success: true, changes: { intent: input.intent, difficulty: newDifficulty } };
      }

      case 'focus_topic': {
        const topic = typeof input.payload['topic'] === 'string' ? input.payload['topic'] : '';
        return { success: true, changes: { intent: 'focus_topic', topic } };
      }

      default:
        return { success: true, changes: { intent: input.intent } };
    }
  },
};
