import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { Typography } from '../Typography/Typography';
import { colors, spacing, radius } from '../../../../app/theme';

export interface BadgeProps {
  label: string;
  tone?: 'primary' | 'success' | 'danger' | 'warning' | 'neutral';
  style?: ViewStyle;
}

const toneBg: Record<NonNullable<BadgeProps['tone']>, string> = {
  primary: colors.primaryDim,
  success: colors.success,
  danger: colors.danger,
  warning: colors.warning,
  neutral: colors.surface,
};

export function Badge({ label, tone = 'neutral', style }: BadgeProps) {
  return (
    <View style={[styles.base, { backgroundColor: toneBg[tone] }, style]}>
      <Typography variant="micro" weight="semibold">
        {label}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
  },
});
