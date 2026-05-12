import React, { type PropsWithChildren, useEffect } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';

export interface FadeInProps {
  duration?: number;
  delay?: number;
}

export function FadeIn({ duration = 400, delay = 0, children }: PropsWithChildren<FadeInProps>) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = delay > 0
      ? withDelay(delay, withTiming(1, { duration }))
      : withTiming(1, { duration });
  }, [duration, delay, opacity]);

  const style = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return <Animated.View style={style}>{children}</Animated.View>;
}
