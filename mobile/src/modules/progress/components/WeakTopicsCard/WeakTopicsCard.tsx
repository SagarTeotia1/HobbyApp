import React from 'react';
import { View } from 'react-native';
import { Typography } from '../../../../shared/components/ui/Typography/Typography';
import { Chip } from '../../../../shared/components/ui/Chip/Chip';
import { weakTopicsCardStyles as styles } from './WeakTopicsCard.styles';

export interface WeakTopicsCardProps {
  topics: string[];
}

export function WeakTopicsCard({ topics }: WeakTopicsCardProps) {
  if (topics.length === 0) return null;

  return (
    <View style={styles.root}>
      <Typography variant="caption" muted weight="semibold">NEEDS WORK</Typography>
      <View style={styles.chips}>
        {topics.map((t) => <Chip key={t} label={t} />)}
      </View>
      <Typography variant="caption" muted>
        These will appear more in your next session.
      </Typography>
    </View>
  );
}
