import { withTiming, type SharedValue } from 'react-native-reanimated';

export interface XPAnimationConfig {
  duration?: number;
}

export const XPAnimation = {
  trigger(value: SharedValue<number>, target: number, config: XPAnimationConfig = {}): void {
    value.value = withTiming(target, { duration: config.duration ?? 800 });
  },
};
