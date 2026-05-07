import ReactNativeHapticFeedback, {
  HapticFeedbackTypes,
} from 'react-native-haptic-feedback';

type HapticType = keyof typeof HapticFeedbackTypes;

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const trigger = (type: HapticType): void => {
  try {
    ReactNativeHapticFeedback.trigger(type, options);
  } catch {
    // No haptic hardware / unsupported platform — silent no-op.
  }
};

export const haptics = {
  light: () => trigger('impactLight'),
  medium: () => trigger('impactMedium'),
  heavy: () => trigger('impactHeavy'),
  success: () => trigger('notificationSuccess'),
  warning: () => trigger('notificationWarning'),
  error: () => trigger('notificationError'),
  select: () => trigger('selection'),
};
