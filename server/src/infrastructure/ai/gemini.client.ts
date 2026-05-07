import { GoogleGenerativeAI, type GenerativeModel } from '@google/generative-ai';
import { env } from '../../config/env';
import { ApiError } from '../../shared/utils/ApiError';

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

// JSON model — used for cards, quizzes, roadmaps. Forces clean JSON output.
const jsonModel: GenerativeModel = genAI.getGenerativeModel({
  model: env.GEMINI_MODEL_FAST,
  generationConfig: {
    responseMimeType: 'application/json',
    temperature: 0.7,
    maxOutputTokens: 4096,
  },
});

// Chat model — streaming text for AI tutor + card simplification.
const chatModel: GenerativeModel = genAI.getGenerativeModel({
  model: env.GEMINI_MODEL_FAST,
  generationConfig: {
    temperature: 0.9,
    maxOutputTokens: 1024,
  },
});

export type GeminiChatTurn = {
  role: 'user' | 'model';
  parts: [{ text: string }];
};

export const geminiClient = {
  /**
   * One-shot JSON generation — cards, quizzes, roadmaps.
   * responseMimeType: 'application/json' removes the need for any parsing tricks.
   */
  async generateJSON<T>(systemPrompt: string, userPrompt: string): Promise<T> {
    const result = await jsonModel.generateContent(`${systemPrompt}\n\n${userPrompt}`);
    const text = result.response.text();
    try {
      return JSON.parse(text) as T;
    } catch {
      throw new ApiError(500, 'AI_PARSE_ERROR', 'Gemini returned invalid JSON', { text });
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
    const chat = chatModel.startChat({
      history: [
        { role: 'user', parts: [{ text: systemPrompt }] },
        { role: 'model', parts: [{ text: 'Understood. Ready to help.' }] },
        ...history,
      ],
    });

    const result = await chat.sendMessageStream(userMessage);
    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (text) yield text;
    }
  },
};
