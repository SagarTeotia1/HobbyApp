import React from 'react';
import { Pressable } from 'react-native';
import { Typography } from '../../../../shared/components/ui/Typography/Typography';
import { timeOptionPillStyles as styles } from './TimeOptionPill.styles';

export type TimeOption = 5 | 10 | 15 | 30 | 60;

export interface TimeOptionPillProps {
  minutes: TimeOption;
  selected: boolean;
  onPress: () => void;
}

const labels: Record<TimeOption, string> = {
  5: '5 min',
  10: '10 min',
  15: '15 min',
  30: '30 min',
  60: '1 hour',
};

export function TimeOptionPill({ minutes, selected, onPress }: TimeOptionPillProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.base, selected && styles.selected]}>
      <Typography variant="body" weight={selected ? 'semibold' : 'regular'}>
        {labels[minutes]}
      </Typography>
    </Pressable>
  );
}
