import React from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { xpMeterStyles as styles } from './XPMeter.styles';
import { colors } from '../../../../app/theme';

export interface XPMeterProps {
  current: number;
  max: number;
  isGaining: boolean;
}

export function XPMeter({ current, max, isGaining }: XPMeterProps) {
  const pct = Math.max(0, Math.min(1, current / max));

  const fillStyle = useAnimatedStyle(() => ({
    width: withTiming(`${pct * 100}%` as `${number}%`, { duration: 400 }),
    backgroundColor: isGaining ? colors.success : colors.danger,
  }));

  return (
    <View style={styles.track}>
      <Animated.View style={[styles.fill, fillStyle]} />
    </View>
  );
}
