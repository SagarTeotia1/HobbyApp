import React from 'react';
import { View } from 'react-native';
import { Typography } from '../../../../shared/components/ui/Typography/Typography';
import { xpSummaryCardStyles as styles } from './XPSummaryCard.styles';
import { colors } from '../../../../app/theme';

export interface XPSummaryCardProps {
  sessionXP: number;
  totalXP: number;
  level: number;
  progressToNextLevel: number;
}

export function XPSummaryCard({ sessionXP, totalXP, level, progressToNextLevel }: XPSummaryCardProps) {
  return (
    <View style={styles.root}>
      <Typography variant="caption" muted weight="semibold">XP THIS SESSION</Typography>
      <Typography variant="title" weight="bold" style={{ color: colors.xp }}>
        +{sessionXP} XP
      </Typography>
      <View style={styles.levelRow}>
        <Typography variant="caption" muted>Level {level}</Typography>
        <Typography variant="caption" muted>{Math.round(progressToNextLevel * 100)}% to Level {level + 1}</Typography>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${progressToNextLevel * 100}%` as `${number}%` }]} />
      </View>
    </View>
  );
}
