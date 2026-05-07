import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV({ id: 'hobbyforge.v1' });

const KEYS = {
  USER_UUID: 'user.uuid',
  JWT: 'auth.jwt',
  CURRENT_HOBBY: 'user.currentHobby',
  ONBOARDING_DONE: 'onboarding.done',
  THEME: 'app.theme',
} as const;

export const storageService = {
  getUUID: (): string | undefined => storage.getString(KEYS.USER_UUID),
  setUUID: (v: string): void => storage.set(KEYS.USER_UUID, v),

  getJWT: (): string | undefined => storage.getString(KEYS.JWT),
  setJWT: (v: string): void => storage.set(KEYS.JWT, v),

  getCurrentHobby: (): string | undefined => storage.getString(KEYS.CURRENT_HOBBY),
  setCurrentHobby: (v: string): void => storage.set(KEYS.CURRENT_HOBBY, v),

  getOnboardingDone: (): boolean => storage.getBoolean(KEYS.ONBOARDING_DONE) ?? false,
  setOnboardingDone: (v: boolean): void => storage.set(KEYS.ONBOARDING_DONE, v),

  clearAll: (): void => storage.clearAll(),
};

export { KEYS as STORAGE_KEYS };
