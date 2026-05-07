import type { NavigatorScreenParams } from '@react-navigation/native';

export type OnboardingStackParamList = {
  'Onboarding.Hobby': undefined;
  'Onboarding.Time': undefined;
  'Onboarding.Level': undefined;
};

export type FeedStackParamList = {
  'Feed.Learning': undefined;
  'Feed.SpeedRound': { sessionId: string };
  'Feed.BossRound': { sessionId: string };
  'Feed.Progress': undefined;
};

export type MainTabParamList = {
  'Tab.Dashboard': undefined;
  'Tab.Feed': NavigatorScreenParams<FeedStackParamList>;
  'Tab.Progress': undefined;
  'Tab.Profile': undefined;
};

export type RootStackParamList = {
  Onboarding: NavigatorScreenParams<OnboardingStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
