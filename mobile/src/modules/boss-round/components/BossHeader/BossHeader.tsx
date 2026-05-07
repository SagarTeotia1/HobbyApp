import React from 'react';
import { View } from 'react-native';
import { Typography } from '../../../../shared/components/ui/Typography/Typography';
import { bossHeaderStyles as styles } from './BossHeader.styles';

export interface BossHeaderProps {
  currentXP: number;
  netXP: number;
}

export function BossHeader({ currentXP, netXP }: BossHeaderProps) {
  return (
    <View style={styles.root}>
      <Typography variant="heading" weight="bold">👑 BOSS ROUND</Typography>
      <View style={styles.xpRow}>
        <Typography variant="body" muted>XP</Typography>
        <Typography variant="body" weight="semibold">
          {currentXP} ({netXP >= 0 ? '+' : ''}{netXP})
        </Typography>
      </View>
    </View>
  );
}
