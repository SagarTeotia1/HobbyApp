import React, { type PropsWithChildren, useEffect } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export interface SlideUpProps {
  distance?: number;
  duration?: number;
}

export function SlideUp({ distance = 16, duration = 350, children }: PropsWithChildren<SlideUpProps>) {
  const translateY = useSharedValue(distance);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withTiming(0, { duration });
    opacity.value = withTiming(1, { duration });
  }, [duration, translateY, opacity]);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return <Animated.View style={style}>{children}</Animated.View>;
}
