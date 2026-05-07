import { StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

export const speedQuestionStyles = StyleSheet.create({
  root: {
    flex: 1,
    gap: spacing.xl,
    padding: spacing.lg,
  },
  questionText: {
    textAlign: 'center',
    marginTop: spacing.xxl,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  option: {
    width: '47%',
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 72,
  },
});
