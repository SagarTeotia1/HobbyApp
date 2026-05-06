import type { LearningCard } from '../../shared/types/common.types';

export interface RecommendationContext {
  userId: string;
  hobbyId: string;
  recentCardIds: string[];
  weakConcepts: string[];
}

export const RecommendationEngine = {
  rank(_candidates: LearningCard[], _ctx: RecommendationContext): LearningCard[] {
    throw new Error('RecommendationEngine.rank not implemented');
  },
};
