import React from 'react';
import { View } from 'react-native';
import { Typography } from '../../../../shared/components/ui/Typography/Typography';
import { streakCardStyles as styles } from './StreakCard.styles';
import { formatStreak } from '../../../../shared/utils/formatStreak';

export interface StreakCardProps {
  streak: number;
}

export function StreakCard({ streak }: StreakCardProps) {
  return (
    <View style={styles.root}>
      <Typography variant="display">🔥</Typography>
      <View style={styles.text}>
        <Typography variant="heading" weight="bold">{formatStreak(streak)}</Typography>
        <Typography variant="caption" muted>Keep it going tomorrow</Typography>
      </View>
    </View>
  );
}
