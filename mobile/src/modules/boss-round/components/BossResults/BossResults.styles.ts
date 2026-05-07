import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../../../app/theme';

export const bossResultsStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
    padding: spacing.xl,
  },
});
