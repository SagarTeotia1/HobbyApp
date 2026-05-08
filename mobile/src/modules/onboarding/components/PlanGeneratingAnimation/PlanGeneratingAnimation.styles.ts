import { StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';
import { borders } from '../../../../app/theme/borders';
import { shadows } from '../../../../app/theme/shadows';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
    paddingHorizontal: spacing.xl,
  },

  // ── Hobby pill ────────────────────────────────────────────────────
  hobbyPill: {
    backgroundColor: colors.yellow,
    borderWidth: borders.width.base,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
    ...shadows.sm,
  },
  hobbyPillText: {
    fontSize: 11,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: 2,
  },

  // ── Headline ──────────────────────────────────────────────────────
  headline: {
    fontSize: 36,
    fontWeight: '900',
    color: colors.text,
    textAlign: 'center',
    letterSpacing: -1,
    lineHeight: 42,
  },

  // ── Icon card ─────────────────────────────────────────────────────
  iconCard: {
    width: 120,
    height: 120,
    borderRadius: radius.lg,
    backgroundColor: colors.primary,
    borderWidth: borders.width.base,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.lg,
  },
  iconEmoji: {
    fontSize: 56,
  },

  // ── Step card ─────────────────────────────────────────────────────
  stepCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.bgElevated,
    borderWidth: borders.width.base,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    width: '100%',
    ...shadows.sm,
  },
  stepIcon: {
    fontSize: 20,
  },
  stepText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
  },

  // ── Progress dots ─────────────────────────────────────────────────
  dotsRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.borderLight,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dotActive: {
    backgroundColor: colors.primary,
    width: 24,
    borderColor: colors.primary,
  },

  // ── Hint ─────────────────────────────────────────────────────────
  hint: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textDim,
    textAlign: 'center',
  },
});
