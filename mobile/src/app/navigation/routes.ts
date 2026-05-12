export const ROUTES = {
  // Root containers
  ONBOARDING: 'Onboarding',
  APP: 'App',

  // Onboarding stack
  ONBOARDING_HOBBY: 'Onboarding.Hobby',
  ONBOARDING_TIME: 'Onboarding.Time',
  ONBOARDING_LEVEL: 'Onboarding.Level',
  ONBOARDING_PLAN_GENERATION: 'Onboarding.PlanGeneration',

  // App stack
  MAIN_TABS:    'App.MainTabs',
  FEED:         'App.Feed',
  PROGRESS:     'App.Progress',
  TOPIC_DETAIL: 'App.TopicDetail',
  LEARN_GRAPH:  'App.LearnGraph',
  COMIC:        'App.Comic',

  // Main tabs (nested inside MAIN_TABS)
  DASHBOARD:    'App.Dashboard',
  ROADMAP:      'App.Roadmap',
} as const;

export type RouteName = (typeof ROUTES)[keyof typeof ROUTES];
