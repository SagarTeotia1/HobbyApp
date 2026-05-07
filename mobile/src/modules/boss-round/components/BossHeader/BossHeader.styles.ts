import { StyleSheet } from 'react-native';
import { spacing } from '../../../../app/theme';

export const bossHeaderStyles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  xpRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center',
  },
});
