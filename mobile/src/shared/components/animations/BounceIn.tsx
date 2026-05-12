import React, { type PropsWithChildren, useEffect } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const BOUNCE_DAMPING = 8;
const BOUNCE_STIFFNESS = 140;

export function BounceIn({ children }: PropsWithChildren) {
  const scale = useSharedValue(0.6);

  useEffect(() => {
    scale.value = withSpring(1, { damping: BOUNCE_DAMPING, stiffness: BOUNCE_STIFFNESS });
  }, [scale]);

  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return <Animated.View style={style}>{children}</Animated.View>;
}
