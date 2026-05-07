import { StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

export const continueLearningCardStyles = StyleSheet.create({
  root: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    gap: spacing.xs,
    flex: 1,
  },
});
