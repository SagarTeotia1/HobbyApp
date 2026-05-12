// Single source of truth for all Redis key templates.
// Mirrors CLAUDE.md §13. Never hardcode redis keys anywhere else.

export const cacheKeys = {
  // Cards
  cardQueue: (userId: string, hobbyId: string) => `card:queue:${userId}:${hobbyId}`,
  cardBatch: (batchId: string) => `card:batch:${batchId}`,
  cardSeen: (userId: string) => `card:seen:${userId}`,

  // Quizzes (pre-generated, batched per session)
  quizSpeed: (userId: string, sessionId: string) => `quiz:speed:${userId}:${sessionId}`,
  quizBoss: (userId: string, sessionId: string) => `quiz:boss:${userId}:${sessionId}`,

  // Sessions
  session: (sessionId: string) => `session:${sessionId}`,

  // Leaderboards (sorted sets)
  leaderboardGlobal: () => `leaderboard:global`,
  leaderboardHobby: (hobbyId: string) => `leaderboard:hobby:${hobbyId}`,

  // Rate limits — named per CLAUDE.md §13
  rateAiChat: (userId: string) => `rate:${userId}:ai-chat`,
  rateSimplify: (userId: string) => `rate:${userId}:simplify`,
  // Generic rate-limit slot used by middleware for arbitrary endpoint groups
  rateLimit: (userId: string, endpoint: string) => `rate:${userId}:${endpoint}`,

  // Reference data
  hobbiesAll: () => `hobbies:all`,

  // YouTube video results per hobby+topic+level
  youtubeVideos: (hobbyId: string, topicId: string, skillLevel: string) =>
    `yt:videos:${hobbyId}:${topicId}:${skillLevel}`,

  // AI comic panel per hobby+topic+page
  comicPanel: (hobbyId: string, topicId: string, page: number) =>
    `comic:panel:${hobbyId}:${topicId}:${page}`,
} as const;

// TTLs in seconds. Mirrors CLAUDE.md §13.
export const cacheTTL = {
  cardQueue: 60 * 60 * 2,        // 2h
  cardBatch: 60 * 60 * 2,        // 2h
  cardSeen: 60 * 60 * 24 * 7,    // 7d
  quizSpeed: 60 * 60 * 2,        // 2h
  quizBoss: 60 * 60 * 2,         // 2h
  session: 60 * 60 * 4,          // 4h
  rateLimit: 60,                 // 60s — default for all rate-limit windows
  hobbiesAll: 60 * 60 * 24,      // 24h
  youtubeVideos: 60 * 60 * 6,   // 6h
  comicPanel: 60 * 60 * 12,     // 12h — image URLs valid long enough
} as const;
