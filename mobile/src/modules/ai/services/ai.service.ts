import { apiClient, unwrap } from '../../../shared/services/api.client';
import type { ApiEnvelope } from '../../../shared/types/api.types';


export interface HobbySuggestion {
  slug: string;
  name: string;
  reason: string;
}

export interface SuggestHobbiesResponse {
  suggestions: HobbySuggestion[];
  clarifyingQuestion: string | null;
}

export const aiService = {
  async suggestHobbies(query: string): Promise<SuggestHobbiesResponse> {
    return unwrap(
      apiClient.post<ApiEnvelope<SuggestHobbiesResponse>>('/ai/hobbies/suggest', { query }),
    );
  },

  async simplifyCard(cardId: string, hobbyId: string): Promise<{ simplifiedContent: string }> {
    return unwrap(
      apiClient.post<ApiEnvelope<{ simplifiedContent: string }>>('/ai/simplify', {
        cardId,
        hobbyId,
      }),
    );
  },

  async generateVideoTitle(hobbyId: string, videoUrl: string): Promise<{ title: string; creator: string }> {
    return unwrap(
      apiClient.get<ApiEnvelope<{ title: string; creator: string }>>('/ai/video-title', {
        params: { hobbyId, videoUrl },
      }),
    );
  },

  async chat(
    message: string,
    hobbyId: string,
    history: Array<{ role: 'user' | 'assistant'; content: string }>,
  ): Promise<string> {
    return unwrap(
      apiClient.post<ApiEnvelope<{ reply: string }>>('/ai/chat/sync', {
        message,
        hobbyId,
        history,
      }),
    ).then((data) => data.reply);
  },
};
