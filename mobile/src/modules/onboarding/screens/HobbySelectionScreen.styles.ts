import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../../app/theme';
import { borders } from '../../../app/theme/borders';
import { shadows } from '../../../app/theme/shadows';

export const hobbySelectionStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  kavContainer: {
    flex: 1,
  },

  // ─── Header ──────────────────────────────────────────────────────
  header: {
    paddingHorizontal: 20,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    gap: spacing.md,
  },
  headerCompact: {
    paddingBottom: spacing.sm,
    gap: spacing.xs,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  stepLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textDim,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
  stepDots: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.borderLight,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dotActive: {
    width: 22,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.border,
  },

  headlineBlock: {
    gap: 4,
  },
  headline: {
    fontSize: 38,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -1,
    lineHeight: 44,
  },
  headlineAccent: {
    color: colors.primary,
  },
  subHeadline: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textMuted,
    lineHeight: 20,
    marginTop: 4,
  },

  // ─── Scroll ───────────────────────────────────────────────────────
  scrollFlex: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: spacing.lg,
    gap: spacing.lg,
  },

  // ─── Card grid ────────────────────────────────────────────────────
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  // ─── Divider ─────────────────────────────────────────────────────
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1.5,
    backgroundColor: colors.border,
  },
  dividerText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textDim,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },

  // ─── AI suggestions ───────────────────────────────────────────────
  aiSection: {
    gap: spacing.sm,
  },
  aiLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  suggestionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },

  // ─── Selected banner ──────────────────────────────────────────────
  selectedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.yellow,
    borderRadius: borders.radius.md,
    borderWidth: borders.width.base,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    ...shadows.sm,
  },
  selectedBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  selectedBannerEmoji: {
    fontSize: 20,
  },
  selectedBannerText: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.text,
  },
  selectedBannerChange: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text,
    textDecorationLine: 'underline',
  },

  // ─── Footer ───────────────────────────────────────────────────────
  footer: {
    paddingHorizontal: 20,
    paddingBottom: spacing.xl,
    paddingTop: spacing.md,
    backgroundColor: colors.bg,
    borderTopWidth: borders.width.base,
    borderTopColor: colors.border,
  },
  footerKeyboard: {
    paddingBottom: spacing.md,
  },
  ctaButton: {
    backgroundColor: colors.primary,
    borderRadius: borders.radius.md,
    borderWidth: borders.width.base,
    borderColor: colors.border,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
  },
  ctaButtonDisabled: {
    backgroundColor: colors.surface,
    borderColor: colors.borderLight,
    ...shadows.none,
  },
  ctaButtonPressed: {
    transform: [{ translateX: 4 }, { translateY: 4 }],
    ...shadows.none,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textInverse,
    letterSpacing: 0.3,
  },
  ctaTextDisabled: {
    color: colors.textDim,
  },
});
