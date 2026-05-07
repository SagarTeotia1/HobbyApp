export interface CompleteOnboardingPayload {
  hobbySlug: string;
  dailyMinutes: 5 | 10 | 15 | 30 | 60;
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
}

export interface OnboardingInitResponse {
  user: {
    uuid: string;
    currentHobbyId: string;
    xp: number;
    level: number;
    streak: number;
    lastActiveDateISO: string;
    preferences: {
      dailyMinutes: 5 | 10 | 15 | 30 | 60;
      skillLevel: 'beginner' | 'intermediate' | 'advanced';
    };
    createdAt: string;
  };
  token: string;
}

export interface CompleteOnboardingResponse {
  roadmap: {
    hobbyId: string;
    skillLevel: 'beginner' | 'intermediate' | 'advanced';
    stages: Array<{
      order: number;
      conceptId: string;
      title: string;
      description: string;
      isUnlocked: boolean;
      isMastered: boolean;
    }>;
  };
  firstCards: Array<{
    id: string;
    hobbyId: string;
    type: 'concept' | 'memory_hook' | 'analogy' | 'mistake_fix' | 'boss_prep' | 'scenario' | 'recap';
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    conceptId: string;
    title: string;
    frontContent: string;
    backContent: string;
    tags: string[];
    estimatedReadSeconds: number;
    generatedAt: string;
  }>;
}
