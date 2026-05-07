import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { speedTimerBarStyles as styles } from './SpeedTimerBar.styles';
import { colors } from '../../../../app/theme';

export interface SpeedTimerBarProps {
  durationSeconds: number;
  onComplete: () => void;
}

export function SpeedTimerBar({ durationSeconds, onComplete }: SpeedTimerBarProps) {
  const progress = useSharedValue(1);

  useEffect(() => {
    progress.value = withTiming(0, {
      duration: durationSeconds * 1000,
      easing: Easing.linear,
    });
    const timer = setTimeout(onComplete, durationSeconds * 1000);
    return () => clearTimeout(timer);
  }, [durationSeconds, onComplete, progress]);

  const animStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
    backgroundColor: progress.value > 0.3 ? colors.primary : colors.danger,
  }));

  return (
    <View style={styles.track}>
      <Animated.View style={[styles.fill, animStyle]} />
    </View>
  );
}
