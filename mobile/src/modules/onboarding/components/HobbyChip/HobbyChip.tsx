import React from 'react';
import { Pressable } from 'react-native';
import { Typography } from '../../../../shared/components/ui/Typography/Typography';
import { hobbyChipStyles as styles } from './HobbyChip.styles';

export interface HobbyChipProps {
  label: string;
  emoji?: string;
  selected?: boolean;
  onPress: () => void;
}

export function HobbyChip({ label, emoji, selected = false, onPress }: HobbyChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.base, selected && styles.selected]}>
      {emoji ? (
        <Typography variant="body">{emoji}</Typography>
      ) : null}
      <Typography
        variant="caption"
        weight={selected ? 'semibold' : 'regular'}
        color={selected ? undefined : undefined}>
        {label}
      </Typography>
    </Pressable>
  );
}
