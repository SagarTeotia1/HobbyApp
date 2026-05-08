import { apiClient, unwrap } from '../../../shared/services/api.client';
import type { TopicDetail, LearnGraph } from '../types/roadmap.types';
import type { ApiEnvelope } from '../../../shared/types/api.types';
import type { AxiosResponse } from 'axios';

interface TopicInput {
  hobbyId: string;
  topicId: string;
  topicName: string;
  hobbyName: string;
}

export const roadmapService = {
  async getTopicDetail(input: TopicInput): Promise<TopicDetail> {
    return unwrap(
      apiClient.post('/roadmap/topic-detail', input) as Promise<AxiosResponse<ApiEnvelope<TopicDetail>>>,
    );
  },

  async getLearnGraph(input: TopicInput): Promise<LearnGraph> {
    return unwrap(
      apiClient.post('/roadmap/learn-graph', input) as Promise<AxiosResponse<ApiEnvelope<LearnGraph>>>,
    );
  },
};
