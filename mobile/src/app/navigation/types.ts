import type { NavigatorScreenParams } from '@react-navigation/native';
import { ROUTES } from './routes';

export type OnboardingStackParamList = {
  [ROUTES.ONBOARDING_HOBBY]: undefined;
  [ROUTES.ONBOARDING_TIME]: { hobbySlug: string };
  [ROUTES.ONBOARDING_LEVEL]: { hobbySlug: string; dailyMinutes: 5 | 10 | 15 | 30 | 60 };
  [ROUTES.ONBOARDING_PLAN_GENERATION]: {
    hobbySlug: string;
    dailyMinutes: 5 | 10 | 15 | 30 | 60;
    skillLevel: 'beginner' | 'intermediate' | 'advanced';
  };
};

export type AppStackParamList = {
  [ROUTES.ROADMAP]: undefined;
  [ROUTES.FEED]: { hobbyId: string; topicId: string; topicName: string };
  [ROUTES.PROGRESS]: { hobbyId: string; videosWatched: number; xpEarned: number };
  [ROUTES.DASHBOARD]: undefined;
};

export type RootStackParamList = {
  [ROUTES.ONBOARDING]: NavigatorScreenParams<OnboardingStackParamList>;
  [ROUTES.APP]: NavigatorScreenParams<AppStackParamList>;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
