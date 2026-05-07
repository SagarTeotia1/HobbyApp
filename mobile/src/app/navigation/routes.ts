// ALL route name strings live here. Never hardcode a route string anywhere else.

export const ROUTES = {
  // Root stack containers
  ROOT: 'Root',
  ONBOARDING: 'Onboarding',
  MAIN: 'Main',
  FEED: 'Feed',

  // Onboarding stack
  ONBOARDING_HOBBY: 'Onboarding.Hobby',
  ONBOARDING_TIME: 'Onboarding.Time',
  ONBOARDING_LEVEL: 'Onboarding.Level',
  ONBOARDING_PLAN_GENERATION: 'Onboarding.PlanGeneration',

  // Main bottom tabs (CLAUDE.md §7: exactly 3 tabs)
  TAB_FEED: 'Tab.Feed',
  TAB_DASHBOARD: 'Tab.Dashboard',
  TAB_PROFILE: 'Tab.Profile',

  // Feed stack (Progress lives here, not as a tab)
  FEED_LEARNING: 'Feed.Learning',
  FEED_PROGRESS: 'Feed.Progress',
} as const;

export type RouteName = (typeof ROUTES)[keyof typeof ROUTES];
