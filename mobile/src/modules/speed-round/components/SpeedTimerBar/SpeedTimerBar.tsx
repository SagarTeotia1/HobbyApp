import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { speedTimerBarStyles as styles } from './SpeedTimerBar.styles';
import { colors } from '../../../../app/theme';

export interface SpeedTimerBarProps {
  durationSeconds: number;
  timeLeft: number;
}

export function SpeedTimerBar({ durationSeconds, timeLeft }: SpeedTimerBarProps) {
  const progress = useSharedValue(timeLeft / durationSeconds);

  useEffect(() => {
    progress.value = withTiming(timeLeft / durationSeconds, {
      duration: 900,
      easing: Easing.linear,
    });
  }, [timeLeft, durationSeconds, progress]);

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
