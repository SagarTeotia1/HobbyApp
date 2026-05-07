import { StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

export const bossQuestionStyles = StyleSheet.create({
  root: {
    flex: 1,
    gap: spacing.xl,
    padding: spacing.lg,
  },
  question: {
    textAlign: 'center',
    marginTop: spacing.xl,
  },
  options: {
    gap: spacing.md,
  },
  option: {
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    minHeight: 56,
    justifyContent: 'center',
  },
});
