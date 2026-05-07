export const STORAGE_KEYS = {
  USER_UUID: 'user.uuid',
  JWT_TOKEN: 'auth.jwt',
  IS_ONBOARDED: 'onboarding.done',
  CURRENT_HOBBY_ID: 'user.currentHobby',
  USER_PREFERENCES: 'user.preferences',
  AI_CHAT_HISTORY: 'ai.chatHistory',
} as const;

export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];
