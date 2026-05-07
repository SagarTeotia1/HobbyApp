import React from 'react';
import { Pressable, View } from 'react-native';
import { Typography } from '../../../../shared/components/ui/Typography/Typography';
import { gamesSectionStyles as styles } from './GamesSection.styles';

export interface GamesSectionProps {
  onSpeedRound: () => void;
  onBossRound: () => void;
}

export function GamesSection({ onSpeedRound, onBossRound }: GamesSectionProps) {
  return (
    <View style={styles.root}>
      <Typography variant="caption" muted weight="semibold">GAMES</Typography>
      <View style={styles.row}>
        <Pressable accessibilityRole="button" onPress={onSpeedRound} style={styles.card}>
          <Typography variant="title">⚡</Typography>
          <Typography variant="body" weight="semibold">Speed Challenge</Typography>
        </Pressable>
        <Pressable accessibilityRole="button" onPress={onBossRound} style={styles.card}>
          <Typography variant="title">👑</Typography>
          <Typography variant="body" weight="semibold">Boss Challenge</Typography>
        </Pressable>
      </View>
    </View>
  );
}
