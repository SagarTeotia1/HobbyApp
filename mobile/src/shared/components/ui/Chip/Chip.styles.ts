import { StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

export const chipStyles = StyleSheet.create({
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
