import { StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

export const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.bgElevated,
    borderTopWidth: 3,
    borderTopColor: colors.border,
    padding: spacing.lg,
    gap: spacing.md,
  },

  // ── Title block ───────────────────────────────────────────────────
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  titleBlock: { flex: 1 },
  videoTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.text,
    lineHeight: 22,
  },
  creatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.xxs,
  },
  creatorDot: {
    width: 6,
    height: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
  },
  creator: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
  },

  // ── Divider ───────────────────────────────────────────────────────
  divider: {
    height: 2,
    backgroundColor: colors.border,
    borderRadius: radius.pill,
  },

  // ── Key insight ───────────────────────────────────────────────────
  insightCard: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.primaryLight,
    padding: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 4,
  },
  insightLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  insightText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    lineHeight: 20,
  },

  // ── Detail / Graph row ────────────────────────────────────────────
  actionRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionBtn: {
    flex: 1,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.sm,
    backgroundColor: colors.bgElevated,
    paddingVertical: spacing.sm,
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
    fontSize: 12,
    fontWeight: '800',
    color: colors.text,
  },

});
