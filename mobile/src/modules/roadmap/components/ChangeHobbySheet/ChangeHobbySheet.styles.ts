import { Dimensions, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';
import { borders } from '../../../../app/theme/borders';
import { shadows } from '../../../../app/theme/shadows';

const SCREEN_W   = Dimensions.get('window').width;
const SHEET_PAD  = spacing.lg * 2;   // paddingHorizontal on sheet
const CARD_COLS  = 3;
const CARD_GAP   = 10;

export const CARD_SIZE = Math.floor(
  (SCREEN_W - SHEET_PAD - CARD_GAP * (CARD_COLS - 1)) / CARD_COLS,
);

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
    paddingTop: spacing.md,
    maxHeight: '85%',
  },
  sheetInner: {
    paddingHorizontal: spacing.lg,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.borderLight,
    alignSelf: 'center',
    marginBottom: spacing.md,
  },

  // ── Header ────────────────────────────────────────────────────────
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textMuted,
    marginTop: 2,
    marginBottom: spacing.lg,
  },

  // ── Grid ─────────────────────────────────────────────────────────
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CARD_GAP,
    marginBottom: spacing.lg,
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    borderRadius: borders.radius.md,
    borderWidth: borders.width.base,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    position: 'relative',
    overflow: 'visible',
    ...shadows.sm,
  },
  cardSelected: {
    backgroundColor: colors.primary,
    ...shadows.none,
    transform: [{ translateX: 3 }, { translateY: 3 }],
  },
  cardPressed: {
    ...shadows.none,
    transform: [{ translateX: 3 }, { translateY: 3 }],
  },
  cardEmoji: { fontSize: 26 },
  cardLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    letterSpacing: 0.2,
    paddingHorizontal: 4,
  },
  cardLabelSelected: { color: colors.textInverse },
  checkBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: { fontSize: 9, fontWeight: '800', color: colors.textInverse },

  // ── Divider ───────────────────────────────────────────────────────
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  dividerLine: { flex: 1, height: 1.5, backgroundColor: colors.border },
  dividerText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textDim,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },

  // ── Search ────────────────────────────────────────────────────────
  searchWrapper: { marginBottom: spacing.md },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: borders.width.base,
    borderColor: colors.border,
    borderRadius: borders.radius.md,
    backgroundColor: colors.bgElevated,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
    ...shadows.sm,
  },
  searchRowFocused: {
    borderColor: colors.primary,
    ...shadows.none,
    transform: [{ translateX: 2 }, { translateY: 2 }],
  },
  searchIcon: { fontSize: 16 },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  searchBtn: {
    width: 32,
    height: 32,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  searchBtnDisabled: {
    backgroundColor: colors.surface,
    borderColor: colors.borderLight,
  },
  searchArrow: { fontSize: 16, fontWeight: '900', color: colors.textInverse },
  searchArrowDisabled: { color: colors.textDim },
  searchHint: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.textDim,
    marginTop: spacing.xs,
    marginLeft: 2,
  },

  // ── Selected banner ───────────────────────────────────────────────
  selectedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.yellow,
    borderWidth: borders.width.base,
    borderColor: colors.border,
    borderRadius: borders.radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  selectedEmoji: { fontSize: 18 },
  selectedName: { flex: 1, fontSize: 14, fontWeight: '800', color: colors.text },
  selectedTag: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.yellow,
    letterSpacing: 1.2,
    backgroundColor: colors.border,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },

  bottomSpacer: { height: 48 },
});
