import React from 'react';
import { View } from 'react-native';
import { Typography } from '../../../../shared/components/ui/Typography/Typography';
import { sessionSummaryCardStyles as styles } from './SessionSummaryCard.styles';

export interface SessionSummaryCardProps {
  cardsSeen: number;
  understood: number;
  bookmarked: number;
}

export function SessionSummaryCard({ cardsSeen, understood, bookmarked }: SessionSummaryCardProps) {
  return (
    <View style={styles.root}>
      <Typography variant="caption" muted weight="semibold">SESSION</Typography>
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Typography variant="title" weight="bold">{cardsSeen}</Typography>
          <Typography variant="caption" muted>Seen</Typography>
        </View>
        <View style={styles.stat}>
          <Typography variant="title" weight="bold">{understood}</Typography>
          <Typography variant="caption" muted>Got it</Typography>
        </View>
        <View style={styles.stat}>
          <Typography variant="title" weight="bold">{bookmarked}</Typography>
          <Typography variant="caption" muted>Saved</Typography>
        </View>
      </View>
    </View>
  );
}
