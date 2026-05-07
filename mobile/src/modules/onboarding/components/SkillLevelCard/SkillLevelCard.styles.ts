import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../../../app/theme';
import { borders } from '../../../../app/theme/borders';
import { shadows } from '../../../../app/theme/shadows';

export const skillLevelCardStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borders.radius.md,
    borderWidth: borders.width.base,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.md,
    ...shadows.sm,
  },
  cardSelected: {
    transform: [{ translateX: 3 }, { translateY: 3 }],
    ...shadows.none,
  },
  cardPressed: {
    transform: [{ translateX: 3 }, { translateY: 3 }],
    ...shadows.none,
  },
  cardSelectedPressed: {
    transform: [{ translateX: 3 }, { translateY: 3 }],
    ...shadows.none,
  },

  // ─── Content ─────────────────────────────────────────────────────
  content: {
    flex: 1,
    gap: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  emoji: {
    fontSize: 28,
  },
  titleBlock: {
    gap: 2,
  },
  label: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
  },

  // ─── Traits ──────────────────────────────────────────────────────
  traits: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  traitChip: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borders.radius.sm,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.bg,
  },
  traitChipSelected: {
    backgroundColor: 'rgba(0,0,0,0.08)',
    borderColor: colors.border,
  },
  traitText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: 0.1,
  },

  // ─── Selection indicator ─────────────────────────────────────────
  indicator: {
    width: 28,
    height: 28,
    borderRadius: borders.radius.sm,
    borderWidth: borders.width.base,
    borderColor: colors.border,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  indicatorSelected: {
    backgroundColor: colors.text,
  },
  checkmark: {
    fontSize: 14,
    fontWeight: '900',
    color: colors.bg,
  },
});
