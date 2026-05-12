import { apiClient, unwrap } from '../../../shared/services/api.client';
import type { TopicDetail, LearnGraph, RoadmapData } from '../types/roadmap.types';
import type { ApiEnvelope } from '../../../shared/types/api.types';

interface TopicInput {
  hobbyId: string;
  topicId: string;
  topicName: string;
  hobbyName: string;
}

export const roadmapService = {
  async getRoadmap(hobbyId: string): Promise<RoadmapData> {
    return unwrap(apiClient.get<ApiEnvelope<RoadmapData>>(`/roadmap/${hobbyId}`));
  },

  async generateRoadmap(
    hobbyId: string,
    skillLevel: 'beginner' | 'intermediate' | 'advanced',
    dailyMinutes: number,
  ): Promise<RoadmapData> {
    return unwrap(
      apiClient.post<ApiEnvelope<RoadmapData>>('/roadmap/generate', { hobbyId, skillLevel, dailyMinutes }),
    );
  },

  async getTopicDetail(input: TopicInput): Promise<TopicDetail> {
    return unwrap(apiClient.post<ApiEnvelope<TopicDetail>>('/roadmap/topic-detail', input));
  },

  async getLearnGraph(input: TopicInput): Promise<LearnGraph> {
    return unwrap(apiClient.post<ApiEnvelope<LearnGraph>>('/roadmap/learn-graph', input));
  },
};
