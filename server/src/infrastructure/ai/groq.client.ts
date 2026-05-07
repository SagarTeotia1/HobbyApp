import Groq from 'groq-sdk';
import { env } from '../../config/env';
import { ApiError } from '../../shared/utils/ApiError';

const groq = new Groq({
  apiKey: env.GROQ_API_KEY,
});

export const groqClient = {
  async generateText(
    systemPrompt: string,
    history: Array<{ role: 'user' | 'assistant'; content: string }>,
    userMessage: string,
  ): Promise<string> {
    const completion = await groq.chat.completions.create({
      model: env.GROQ_MODEL_FAST,
      temperature: 0.9,
      max_tokens: 512,
      messages: [
        { role: 'system', content: systemPrompt },
        ...history.map((m) => ({ role: m.role, content: m.content })),
        { role: 'user', content: userMessage },
      ],
    });
    return completion.choices[0]?.message?.content ?? '';
  },

  async generateJSON<T>(systemPrompt: string, userPrompt: string): Promise<T> {
    const completion = await groq.chat.completions.create({
      model: env.GROQ_MODEL_FAST,
      temperature: 0.7,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    });

    const text = completion.choices[0]?.message?.content;
    if (!text) {
      throw new ApiError(500, 'AI_EMPTY_RESPONSE', 'Groq returned an empty response');
    }

    try {
      return JSON.parse(text) as T;
    } catch {
      throw new ApiError(500, 'AI_PARSE_ERROR', 'Groq returned invalid JSON', { text });
    }
  },
};
