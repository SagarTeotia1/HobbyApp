import { StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

export const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  connector: {
    width: 3,
    height: 32,
    backgroundColor: colors.border,
  },
  connectorCompleted: {
    backgroundColor: colors.primary,
  },
  connectorLocked: {
    backgroundColor: colors.borderLight,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  cardColumn: {
    flex: 1,
    gap: 6,
  },
  cardInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
  },
  continueDivider: {
    width: 1.5,
    alignSelf: 'stretch',
    backgroundColor: colors.border,
    marginHorizontal: spacing.sm,
    opacity: 0.3,
  },
  continueSection: {
    width: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: radius.pill,
    borderWidth: 3,
    borderColor: colors.border,
    backgroundColor: colors.bgElevated,
  },
  dotCompleted: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dotCurrent: {
    backgroundColor: colors.yellow,
    borderColor: colors.border,
  },
  dotLocked: {
    backgroundColor: colors.surface,
    borderColor: colors.borderLight,
  },
  card: {
    flex: 1,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.bgElevated,
    padding: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 4,
  },
  cardCompleted: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  cardCurrent: {
    backgroundColor: colors.yellow,
    borderColor: colors.border,
  },
  cardLocked: {
    backgroundColor: colors.surface,
    borderColor: colors.borderLight,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  cardPressed: {
    transform: [{ translateX: 3 }, { translateY: 3 }],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  labelCompleted: { color: colors.primary },
  labelCurrent: { color: colors.text },
  labelLocked: { color: colors.textDim },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.text,
  },
  titleLocked: {
    color: colors.textDim,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
  },
  progressDotEmpty: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  checkmark: {
    fontSize: 16,
  },
  lockIcon: {
    fontSize: 14,
  },

  continueBtnText: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.primary,
  },

  // ── Inline action buttons ─────────────────────────────────────────
  actionRow: {
    flexDirection: 'row',
    gap: 6,
  },
  actionBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.sm,
    backgroundColor: colors.bgElevated,
    paddingVertical: spacing.xs,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 2,
  },
  actionBtnGraph: {
    backgroundColor: colors.primaryLight,
  },
  actionBtnPressed: {
    transform: [{ translateX: 2 }, { translateY: 2 }],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  actionBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: 0.2,
  },
});
