import { StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

export const learningCardStyles = StyleSheet.create({
  root: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  face: {
    padding: spacing.xl,
    gap: spacing.md,
    minHeight: 320,
    justifyContent: 'center',
  },
  typeBadge: {
    alignSelf: 'flex-start',
  },
  flipHint: {
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.md,
  },
});
