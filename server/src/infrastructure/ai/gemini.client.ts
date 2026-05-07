import { GoogleGenerativeAI, type GenerativeModel } from '@google/generative-ai';
import { env } from '../../config/env';
import { ApiError } from '../../shared/utils/ApiError';

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

const JSON_GENERATION_CONFIG = {
  responseMimeType: 'application/json' as const,
  temperature: 0.7,
  maxOutputTokens: 4096,
};

const CHAT_GENERATION_CONFIG = {
  temperature: 0.9,
  maxOutputTokens: 1024,
};

// JSON model — used for cards, quizzes, roadmaps. Forces clean JSON output.
const jsonModel: GenerativeModel = genAI.getGenerativeModel({
  model: env.GEMINI_MODEL_FAST,
  generationConfig: JSON_GENERATION_CONFIG,
});
const jsonFallbackModel: GenerativeModel = genAI.getGenerativeModel({
  model: env.GEMINI_MODEL_FALLBACK,
  generationConfig: {
    ...JSON_GENERATION_CONFIG,
  },
});

// Chat model — streaming text for AI tutor + card simplification.
const chatModel: GenerativeModel = genAI.getGenerativeModel({
  model: env.GEMINI_MODEL_FAST,
  generationConfig: CHAT_GENERATION_CONFIG,
});
const chatFallbackModel: GenerativeModel = genAI.getGenerativeModel({
  model: env.GEMINI_MODEL_FALLBACK,
  generationConfig: CHAT_GENERATION_CONFIG,
});

export type GeminiChatTurn = {
  role: 'user' | 'model';
  parts: [{ text: string }];
};

function isQuotaOrRateLimitError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return message.includes('429') || message.toLowerCase().includes('quota');
}

export const geminiClient = {
  /**
   * One-shot JSON generation — cards, quizzes, roadmaps.
   * responseMimeType: 'application/json' removes the need for any parsing tricks.
   */
  async generateJSON<T>(systemPrompt: string, userPrompt: string): Promise<T> {
    let text = '';
    try {
      const result = await jsonModel.generateContent(`${systemPrompt}\n\n${userPrompt}`);
      text = result.response.text();
      return JSON.parse(text) as T;
    } catch (error) {
      const canFallback = env.GEMINI_MODEL_FALLBACK !== env.GEMINI_MODEL_FAST && isQuotaOrRateLimitError(error);
      if (canFallback) {
        const fallbackResult = await jsonFallbackModel.generateContent(`${systemPrompt}\n\n${userPrompt}`);
        text = fallbackResult.response.text();
        try {
          return JSON.parse(text) as T;
        } catch {
          throw new ApiError(500, 'AI_PARSE_ERROR', 'Gemini fallback returned invalid JSON', { text });
        }
      }

      if (text) {
        throw new ApiError(500, 'AI_PARSE_ERROR', 'Gemini returned invalid JSON', { text });
      }
      throw error;
    }
  },

  /**
   * Streaming text — AI chat, card simplification.
   * `history` uses Gemini format: role 'user' | 'model', parts: [{ text }]
   */
  async *streamText(
    systemPrompt: string,
    history: GeminiChatTurn[],
    userMessage: string,
  ): AsyncGenerator<string> {
    const baseHistory = [
      { role: 'user' as const, parts: [{ text: systemPrompt }] },
      { role: 'model' as const, parts: [{ text: 'Understood. Ready to help.' }] },
      ...history,
    ];

    const chat = chatModel.startChat({
      history: baseHistory,
    });

    try {
      const result = await chat.sendMessageStream(userMessage);
      for await (const chunk of result.stream) {
        const text = chunk.text();
        if (text) yield text;
      }
      return;
    } catch (error) {
      const canFallback = env.GEMINI_MODEL_FALLBACK !== env.GEMINI_MODEL_FAST && isQuotaOrRateLimitError(error);
      if (!canFallback) throw error;
    }

    const fallbackChat = chatFallbackModel.startChat({
      history: [
        ...baseHistory,
      ],
    });
    const result = await fallbackChat.sendMessageStream(userMessage);
    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (text) yield text;
    }
  },
};
