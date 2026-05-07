import React, { type PropsWithChildren, useEffect } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export interface FadeInProps {
  duration?: number;
  delay?: number;
}

export function FadeIn({ duration = 400, delay = 0, children }: PropsWithChildren<FadeInProps>) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration });
  }, [duration, opacity]);

  const style = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return <Animated.View style={[style, { transform: [{ translateY: 0 }] }]}>{children}</Animated.View>;
}
