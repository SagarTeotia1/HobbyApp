import { StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

export const aiChatStyles = StyleSheet.create({
  collapsed: {
    height: 56,
    borderRadius: radius.pill,
    backgroundColor: colors.bgElevated,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  expanded: {
    flex: 1,
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing.lg,
    gap: spacing.md,
  },
  bubble: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.lg,
    maxWidth: '85%',
  },
  bubbleUser: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
  },
  bubbleAssistant: {
    alignSelf: 'flex-start',
    backgroundColor: colors.bgElevated,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
  },
});
