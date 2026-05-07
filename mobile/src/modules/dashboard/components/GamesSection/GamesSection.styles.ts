import { StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

export const gamesSectionStyles = StyleSheet.create({
  root: {
    gap: spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
