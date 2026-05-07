export const ROUTES = {
  ROOT: 'Root',
  ONBOARDING: 'Onboarding',
  ONBOARDING_HOBBY: 'Onboarding.Hobby',
  ONBOARDING_TIME: 'Onboarding.Time',
  ONBOARDING_LEVEL: 'Onboarding.Level',

  MAIN: 'Main',
  TAB_DASHBOARD: 'Tab.Dashboard',
  TAB_FEED: 'Tab.Feed',
  TAB_PROGRESS: 'Tab.Progress',
  TAB_PROFILE: 'Tab.Profile',

  FEED: 'Feed',
  FEED_LEARNING: 'Feed.Learning',
  FEED_SPEED_ROUND: 'Feed.SpeedRound',
  FEED_BOSS_ROUND: 'Feed.BossRound',
  FEED_PROGRESS: 'Feed.Progress',
} as const;

export type RouteName = (typeof ROUTES)[keyof typeof ROUTES];
