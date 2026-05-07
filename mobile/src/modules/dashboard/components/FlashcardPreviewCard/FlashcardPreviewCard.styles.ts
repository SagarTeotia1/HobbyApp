import { StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

export const flashcardPreviewCardStyles = StyleSheet.create({
  root: {
    backgroundColor: colors.bgElevated,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    gap: spacing.xs,
    flex: 1,
  },
});
