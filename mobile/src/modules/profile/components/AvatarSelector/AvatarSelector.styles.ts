import { StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

export const avatarSelectorStyles = StyleSheet.create({
  root: {
    gap: spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryDim,
  },
});
