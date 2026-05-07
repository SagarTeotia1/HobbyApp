import React from 'react';
import { Pressable, StyleSheet, type ViewStyle } from 'react-native';
import { Typography } from '../Typography/Typography';
import { colors, spacing, radius } from '../../../../app/theme';
import { haptics } from '../../../utils/haptics';

export interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

export function Chip({ label, selected = false, onPress, style }: ChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => {
        haptics.select();
        onPress?.();
      }}
      style={[styles.base, selected && styles.selected, style]}>
      <Typography
        variant="caption"
        weight={selected ? 'semibold' : 'regular'}
        color={selected ? colors.text : colors.textMuted}>
        {label}
      </Typography>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selected: {
    backgroundColor: colors.primaryDim,
    borderColor: colors.primary,
  },
});
