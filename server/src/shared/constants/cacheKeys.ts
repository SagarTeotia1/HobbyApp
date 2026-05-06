export const cacheKeys = {
  cardQueue: (userId: string) => `card:queue:${userId}`,
  cardSeen: (userId: string) => `card:seen:${userId}`,
  session: (userId: string) => `session:${userId}`,
  leaderboardGlobal: () => `leaderboard:global`,
  leaderboardHobby: (hobbyId: string) => `leaderboard:hobby:${hobbyId}`,
  rateLimit: (userId: string, endpoint: string) => `rate:${userId}:${endpoint}`,
} as const;

export const cacheTTL = {
  cardSeen: 60 * 60 * 24 * 7,
  session: 60 * 60 * 2,
  rateLimit: 60,
} as const;
