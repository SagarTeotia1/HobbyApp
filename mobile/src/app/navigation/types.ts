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

export type FeedStackParamList = {
  [ROUTES.FEED_LEARNING]: undefined;
  [ROUTES.FEED_SPEED_ROUND]: { sessionId: string };
  [ROUTES.FEED_BOSS_ROUND]: { sessionId: string };
  [ROUTES.FEED_PROGRESS]: undefined;
};

export type MainTabParamList = {
  [ROUTES.TAB_FEED]: NavigatorScreenParams<FeedStackParamList>;
  [ROUTES.TAB_DASHBOARD]: undefined;
  [ROUTES.TAB_PROFILE]: undefined;
};

export type RootStackParamList = {
  [ROUTES.ONBOARDING]: NavigatorScreenParams<OnboardingStackParamList>;
  [ROUTES.MAIN]: NavigatorScreenParams<MainTabParamList>;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
