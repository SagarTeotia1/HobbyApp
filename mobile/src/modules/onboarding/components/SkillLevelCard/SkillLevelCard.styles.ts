import { StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

export const skillLevelCardStyles = StyleSheet.create({
  base: {
    flex: 1,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    gap: spacing.xs,
  },
  selected: {
    backgroundColor: colors.primaryDim,
    borderColor: colors.primary,
  },
});
