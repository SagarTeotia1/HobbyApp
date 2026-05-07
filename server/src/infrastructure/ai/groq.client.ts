import Groq from 'groq-sdk';
import { env } from '../../config/env';
import { ApiError } from '../../shared/utils/ApiError';

const groq = new Groq({
  apiKey: env.GROQ_API_KEY,
});

export const groqClient = {
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
