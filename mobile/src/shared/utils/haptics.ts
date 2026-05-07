import { Vibration, Platform } from 'react-native';

const vibrate = (pattern: number | number[]): void => {
  if (Platform.OS === 'web') return;
  try {
    Vibration.vibrate(pattern);
  } catch {
    // No haptic hardware or permission — silent no-op.
  }
};

export const haptics = {
  light: () => vibrate(10),
  medium: () => vibrate(20),
  heavy: () => vibrate(40),
  success: () => vibrate([0, 30, 50, 30]),
  warning: () => vibrate([0, 20, 40, 60]),
  error: () => vibrate([0, 50, 30, 50, 30, 50]),
  select: () => vibrate(8),
};
