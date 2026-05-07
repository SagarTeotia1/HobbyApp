import { MMKV } from 'react-native-mmkv';
import { STORAGE_KEYS } from '../constants/storageKeys';

export const storage = new MMKV({ id: 'hobbyforge.v1' });

export const storageService = {
  getUUID: (): string | undefined => storage.getString(STORAGE_KEYS.USER_UUID),
  setUUID: (v: string): void => storage.set(STORAGE_KEYS.USER_UUID, v),

  getJWT: (): string | undefined => storage.getString(STORAGE_KEYS.JWT_TOKEN),
  setJWT: (v: string): void => storage.set(STORAGE_KEYS.JWT_TOKEN, v),

  getCurrentHobby: (): string | undefined => storage.getString(STORAGE_KEYS.CURRENT_HOBBY_ID),
  setCurrentHobby: (v: string): void => storage.set(STORAGE_KEYS.CURRENT_HOBBY_ID, v),

  getOnboardingDone: (): boolean => storage.getBoolean(STORAGE_KEYS.IS_ONBOARDED) ?? false,
  setOnboardingDone: (v: boolean): void => storage.set(STORAGE_KEYS.IS_ONBOARDED, v),

  clearAll: (): void => storage.clearAll(),
};
