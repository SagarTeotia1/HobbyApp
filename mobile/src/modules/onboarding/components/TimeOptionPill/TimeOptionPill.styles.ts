import { StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

export const timeOptionPillStyles = StyleSheet.create({
  base: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  selected: {
    backgroundColor: colors.primaryDim,
    borderColor: colors.primary,
  },
});
