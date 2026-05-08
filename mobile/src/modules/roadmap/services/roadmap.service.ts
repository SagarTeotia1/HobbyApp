import { apiClient, unwrap } from '../../../shared/services/api.client';
import type { TopicDetail, LearnGraph, RoadmapData } from '../types/roadmap.types';
import type { ApiEnvelope } from '../../../shared/types/api.types';
import type { AxiosResponse } from 'axios';

interface TopicInput {
  hobbyId: string;
  topicId: string;
  topicName: string;
  hobbyName: string;
}

export const roadmapService = {
  async getRoadmap(hobbyId: string): Promise<RoadmapData> {
    return unwrap(
      apiClient.get(`/roadmap/${hobbyId}`) as Promise<AxiosResponse<ApiEnvelope<RoadmapData>>>,
    );
  },

  async generateRoadmap(
    hobbyId: string,
    skillLevel: 'beginner' | 'intermediate' | 'advanced',
    dailyMinutes: number,
  ): Promise<RoadmapData> {
    return unwrap(
      apiClient.post('/roadmap/generate', { hobbyId, skillLevel, dailyMinutes }) as Promise<
        AxiosResponse<ApiEnvelope<RoadmapData>>
      >,
    );
  },

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
