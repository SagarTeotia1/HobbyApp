export const queryKeys = {
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
    summary: (hobbyId: string) => [...queryKeys.progress.all, 'summary', hobbyId] as const,
  },
  leaderboard: {
    all: ['leaderboard'] as const,
    global: () => [...queryKeys.leaderboard.all, 'global'] as const,
    hobby: (hobbyId: string) => [...queryKeys.leaderboard.all, 'hobby', hobbyId] as const,
  },
  profile: {
    me: ['profile', 'me'] as const,
  },
} as const;
