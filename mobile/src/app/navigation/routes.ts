export const ROUTES = {
  // Root containers
  ONBOARDING: 'Onboarding',
  APP: 'App',

  // Onboarding stack
  ONBOARDING_HOBBY: 'Onboarding.Hobby',
  ONBOARDING_TIME: 'Onboarding.Time',
  ONBOARDING_LEVEL: 'Onboarding.Level',
  ONBOARDING_PLAN_GENERATION: 'Onboarding.PlanGeneration',

  // App stack (no tabs)
  ROADMAP: 'App.Roadmap',
  FEED: 'App.Feed',
  PROGRESS: 'App.Progress',
  DASHBOARD: 'App.Dashboard',
} as const;

export type RouteName = (typeof ROUTES)[keyof typeof ROUTES];
