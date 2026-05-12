import { apiClient, unwrap } from '../../../shared/services/api.client';
import type { ApiEnvelope } from '../../../shared/types/api.types';

export interface ComicPanel {
  imageUrl: string;
  prompt: string;
  page: number;
  totalPages: number;
  seed: number;
  cachedAt: string;
}

export interface ComicPanelParams {
  hobbyId: string;
  topicId: string;
  topicName: string;
  hobbyName: string;
  page: number;
}

export const comicService = {
  async getPanel(params: ComicPanelParams): Promise<ComicPanel> {
    return unwrap(
      apiClient.get<ApiEnvelope<ComicPanel>>('/comic/panel', {
        params,
        timeout: 90_000, // Gradio gen can take up to 90s on cold start
      }),
    );
  },
};
