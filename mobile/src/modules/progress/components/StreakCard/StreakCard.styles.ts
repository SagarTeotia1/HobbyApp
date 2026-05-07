import { StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

export const streakCardStyles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  text: {
    gap: spacing.xs,
  },
});
