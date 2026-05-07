import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { aiChatStyles } from './AIChatInterface.styles';

function AnimatedDot({ delay }: { delay: number }) {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 400 }),
          withTiming(0.3, { duration: 400 }),
        ),
        -1,
        false,
      ),
    );
  }, [delay, opacity]);

  const style = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return <Animated.View style={[aiChatStyles.typingDot, style]} />;
}

export function AIChatTypingIndicator() {
  return (
    <View style={aiChatStyles.typingContainer}>
      <AnimatedDot delay={0} />
      <AnimatedDot delay={150} />
      <AnimatedDot delay={300} />
    </View>
  );
}
