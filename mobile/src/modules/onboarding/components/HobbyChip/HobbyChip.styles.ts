import { StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

export const hobbyChipStyles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
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
