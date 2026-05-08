import { StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

// DOT_COL_WIDTH must stay in sync with dotCol.width below
const DOT_SIZE = 22;
const DOT_COL_WIDTH = 36;
const CONNECTOR_W = 3;
const CONNECTOR_H = 28;

export const styles = StyleSheet.create({
  wrapper: {
    // no alignItems — let timelineRow control alignment
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  // ── Left timeline rail ────────────────────────────────────────────
  dotCol: {
    width: DOT_COL_WIDTH,
    alignItems: 'center',
  },

  // connector drawn above the dot (between prev node and this one)
  connectorTrack: {
    width: CONNECTOR_W,
    height: CONNECTOR_H,
    backgroundColor: colors.borderLight,
    borderRadius: radius.pill,
    overflow: 'hidden',
    justifyContent: 'flex-end', // fill grows upward from bottom → feels like it "connects"
  },
  connectorFill: {
    width: '100%',
    backgroundColor: colors.primary,
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

  // tail drawn below the dot (going toward next node)
  tail: {
    width: CONNECTOR_W,
    flex: 1,
    minHeight: 20,
    borderRadius: radius.pill,
  },
  tailCompleted: {
    backgroundColor: colors.primary,
  },
  tailPending: {
    backgroundColor: colors.borderLight,
  },

  // ── Right card column ─────────────────────────────────────────────
  cardCol: {
    flex: 1,
    marginLeft: spacing.sm,
    paddingBottom: CONNECTOR_H, // space so tail lines up before next node
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
  continueBtnText: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.primary,
  },

  // ── Card ──────────────────────────────────────────────────────────
  card: {
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
    opacity: 0.6,
  },
  cardPressed: {
    transform: [{ translateX: 3 }, { translateY: 3 }],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },

  // ── Card content ──────────────────────────────────────────────────
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  label: {
    fontSize: 10,
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
  checkmark: { fontSize: 15 },
  lockIcon: { fontSize: 13 },

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
