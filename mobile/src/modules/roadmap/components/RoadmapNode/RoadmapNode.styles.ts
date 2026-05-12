import { StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

export const DOT_SIZE = 28;
export const DOT_COL_WIDTH = 44;
const CONNECTOR_W = 3;
const CONNECTOR_H = 20;

export const styles = StyleSheet.create({
  wrapper: {},
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  // ── Left timeline rail ──────────────────────────────────────────────
  dotCol: {
    width: DOT_COL_WIDTH,
    alignItems: 'center',
  },
  connectorTrack: {
    width: CONNECTOR_W,
    height: CONNECTOR_H,
    backgroundColor: colors.borderLight,
    borderRadius: radius.pill,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  connectorFill: {
    width: '100%',
    borderRadius: radius.pill,
  },

  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    borderWidth: 3,
    borderColor: colors.border,
    backgroundColor: colors.bgElevated,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotCompleted: {
    backgroundColor: colors.mint,
    borderColor: colors.border,
  },
  dotCurrent: {
    backgroundColor: colors.yellow,
    borderColor: colors.border,
  },
  dotLocked: {
    backgroundColor: colors.surface,
    borderColor: colors.borderLight,
  },
  dotNumber: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.text,
  },
  dotNumberCompleted: {
    color: colors.textInverse,
  },
  dotNumberLocked: {
    color: colors.textDim,
  },

  tail: {
    width: CONNECTOR_W,
    flex: 1,
    minHeight: 16,
    borderRadius: radius.pill,
  },
  tailCompleted: { backgroundColor: colors.mint },
  tailPending:   { backgroundColor: colors.borderLight },

  // ── Right card column ───────────────────────────────────────────────
  cardCol: {
    flex: 1,
    marginLeft: spacing.sm,
    paddingBottom: CONNECTOR_H,
    gap: spacing.xs,
  },

  // ── Card shell ──────────────────────────────────────────────────────
  card: {
    borderWidth: 2.5,
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.bgElevated,
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 4,
  },
  cardCompleted: {
    backgroundColor: '#E8F8F0',
    borderColor: colors.mint,
  },
  cardCurrent: {
    backgroundColor: colors.yellow,
    borderColor: colors.border,
    shadowOffset: { width: 5, height: 5 },
    elevation: 5,
  },
  cardLocked: {
    backgroundColor: colors.surface,
    borderColor: colors.borderLight,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    elevation: 0,
    opacity: 0.55,
  },
  cardPressed: {
    transform: [{ translateX: 4 }, { translateY: 4 }],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },

  // ── Card body ────────────────────────────────────────────────────────
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.sm,
  },
  cardContent: { flex: 1, gap: spacing.xs },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusBadge: {
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  statusBadgeCompleted: { backgroundColor: colors.mint },
  statusBadgeCurrent:   { backgroundColor: colors.primary },
  statusBadgeLocked:    { backgroundColor: colors.borderLight },
  statusText: {
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1,
    color: colors.textInverse,
  },
  statusTextDark: {
    color: colors.textDim,
  },
  partLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.textDim,
    letterSpacing: 0.5,
  },

  title: {
    fontSize: 14,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -0.2,
    lineHeight: 18,
  },
  titleLocked: { color: colors.textDim },
  titleCurrent: { color: colors.text },

  // Mini progress bar (replaces dots)
  progressWrap: { gap: 3 },
  progressTrack: {
    height: 5,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
  },
  progressFillCurrent: {
    backgroundColor: colors.primary,
  },
  progressFillComplete: {
    backgroundColor: colors.mint,
  },
  progressMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressMetaText: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.textMuted,
  },

  // Arrow chevron
  chevronWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.07)',
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronWrapCurrent: {
    backgroundColor: colors.primary,
    borderColor: colors.border,
  },
  chevronText: {
    fontSize: 14,
    fontWeight: '900',
    color: colors.textMuted,
    lineHeight: 18,
  },
  chevronTextCurrent: {
    color: colors.textInverse,
  },
  lockChevron: {
    fontSize: 14,
    color: colors.textDim,
  },

  // ── Action strip ─────────────────────────────────────────────────────
  actionStrip: {
    flexDirection: 'row',
    borderTopWidth: 2,
    borderTopColor: 'rgba(0,0,0,0.08)',
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
  },
  actionBtnLeft: {
    borderRightWidth: 1.5,
    borderRightColor: 'rgba(0,0,0,0.08)',
  },
  actionBtnPressed: { opacity: 0.6 },
  actionBtnIcon: { fontSize: 13 },
  actionBtnLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  actionBtnLabelDetail: { color: colors.primary },
  actionBtnLabelGraph:  { color: colors.violet },
});
