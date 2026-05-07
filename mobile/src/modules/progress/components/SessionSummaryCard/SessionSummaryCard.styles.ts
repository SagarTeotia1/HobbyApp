import { StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

export const sessionSummaryCardStyles = StyleSheet.create({
  root: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
    gap: spacing.xs,
  },
});
