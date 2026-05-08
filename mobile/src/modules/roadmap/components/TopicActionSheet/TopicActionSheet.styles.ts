import { StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.bg,
    borderTopWidth: 3,
    borderTopColor: colors.border,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: 40,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.borderLight,
    alignSelf: 'center',
    marginBottom: spacing.lg,
  },
  topicLabel: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  hint: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textDim,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: spacing.lg,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.bgElevated,
    padding: spacing.md,
    marginBottom: spacing.sm,
    shadowColor: colors.shadow,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 3,
    gap: spacing.md,
  },
  optionGraph: {
    backgroundColor: colors.primaryLight,
  },
  optionPressed: {
    transform: [{ translateX: 3 }, { translateY: 3 }],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  optionIcon: {
    fontSize: 28,
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 2,
  },
  optionSub: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textMuted,
    lineHeight: 16,
  },
  arrow: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textDim,
  },
});
