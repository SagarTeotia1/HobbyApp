import { GoogleGenerativeAI, type GenerativeModel } from '@google/generative-ai';
import { env } from '../../config/env';
import { logger } from '../../shared/logger/winston';

const client = new GoogleGenerativeAI(env.GEMINI_API_KEY);

export const geminiFast: GenerativeModel = client.getGenerativeModel({
  model: env.GEMINI_MODEL_FAST,
  generationConfig: {
    temperature: 0.7,
    responseMimeType: 'application/json',
  },
});

export const geminiPro: GenerativeModel = client.getGenerativeModel({
  model: env.GEMINI_MODEL_PRO,
  generationConfig: {
    temperature: 0.6,
    responseMimeType: 'application/json',
  },
});

export const geminiProStreaming: GenerativeModel = client.getGenerativeModel({
  model: env.GEMINI_MODEL_PRO,
  generationConfig: {
    temperature: 0.7,
  },
});

export interface GeminiJsonOptions {
  prompt: string;
  model?: GenerativeModel;
}

export async function generateJson<T>({
  prompt,
  model = geminiFast,
}: GeminiJsonOptions): Promise<T> {
  const result = await model.generateContent(prompt);
  const text = result.response.text();
  try {
    return JSON.parse(text) as T;
  } catch (err) {
    logger.error('[gemini] failed to parse JSON response', { text, err });
    throw new Error('Gemini returned malformed JSON');
  }
}

export async function* generateStream(prompt: string): AsyncGenerator<string> {
  const result = await geminiProStreaming.generateContentStream(prompt);
  for await (const chunk of result.stream) {
    const text = chunk.text();
    if (text) yield text;
  }
}
