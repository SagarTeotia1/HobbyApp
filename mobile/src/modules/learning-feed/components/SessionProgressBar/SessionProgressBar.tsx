import React from 'react';
import { View } from 'react-native';
import { sessionProgressBarStyles as styles } from './SessionProgressBar.styles';
import { colors } from '../../../../app/theme';

export interface SessionProgressBarProps {
  current: number;
  total: number;
}

export function SessionProgressBar({ current, total }: SessionProgressBarProps) {
  return (
    <View style={styles.track}>
      {Array.from({ length: total }, (_, i) => (
        <View
          key={i}
          style={[styles.dot, i < current ? { backgroundColor: colors.primary } : null]}
        />
      ))}
    </View>
  );
}
