export const queryKeys = {
  roadmap: {
    all: ['roadmap'] as const,
    byId: (hobbyId: string) => ['roadmap', hobbyId] as const,
  },
  hobbies: {
    all: ['hobbies'] as const,
    list: () => [...queryKeys.hobbies.all, 'list'] as const,
    bySlug: (slug: string) => [...queryKeys.hobbies.all, 'slug', slug] as const,
  },
  feed: {
    all: ['feed'] as const,
    forHobby: (hobbyId: string) => [...queryKeys.feed.all, 'hobby', hobbyId] as const,
  },
  progress: {
    all: ['progress'] as const,
    idle: ['progress', 'idle'] as const,
    sessionIdle: ['progress', 'session', 'idle'] as const,
    dashboardIdle: ['progress', 'dashboard', 'idle'] as const,
    summary: (hobbyId: string) => [...queryKeys.progress.all, 'summary', hobbyId] as const,
    session: (sessionId: string) => [...queryKeys.progress.all, 'session', sessionId] as const,
    dashboard: (hobbyId: string) => [...queryKeys.progress.all, 'dashboard', hobbyId] as const,
  },
  dashboard: {
    idle: ['dashboard', 'idle'] as const,
  },
  youtube: {
    all: ['youtube'] as const,
    videos: (hobbyId: string, topicId: string, skillLevel: string) =>
      ['youtube', 'videos', hobbyId, topicId, skillLevel] as const,
  },
  comic: {
    all: ['comic'] as const,
    panel: (hobbyId: string, topicId: string, page: number) =>
      ['comic', 'panel', hobbyId, topicId, page] as const,
  },
} as const;
