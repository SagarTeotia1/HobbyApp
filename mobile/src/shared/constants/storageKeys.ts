export const STORAGE_KEYS = {
  USER_UUID: 'user.uuid',
  JWT_TOKEN: 'auth.jwt',
  IS_ONBOARDED: 'onboarding.done',
  CURRENT_HOBBY_ID: 'user.currentHobby',
  USER_PREFERENCES: 'user.preferences',
  AI_CHAT_HISTORY: 'ai.chatHistory',
  THEME: 'app.theme',
  USER_XP: 'user.xp',
  USER_LEVEL: 'user.level',
  USER_STREAK: 'user.streak',
  LAST_SESSION_DATE: 'user.lastSessionDate',
  ROADMAP_PROGRESS: 'roadmap.progress',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
