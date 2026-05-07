import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../../../app/theme';
import { borders } from '../../../../app/theme/borders';
import { shadows } from '../../../../app/theme/shadows';

const SCREEN_WIDTH = Dimensions.get('window').width;
const H_PADDING = 20 * 2;
const CARD_COLUMNS = 3;
const CARD_GAP = 10;

export const CARD_SIZE = Math.floor(
  (SCREEN_WIDTH - H_PADDING - CARD_GAP * (CARD_COLUMNS - 1)) / CARD_COLUMNS,
);

export const hobbyChipStyles = StyleSheet.create({
  // ─── Card variant ────────────────────────────────────────────────
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    borderRadius: borders.radius.md,
    borderWidth: borders.width.base,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
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
  cardEmoji: {
    fontSize: 28,
  },
  cardLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  cardLabelSelected: {
    color: colors.textInverse,
  },
  checkBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textInverse,
  },

  // ─── Chip variant ────────────────────────────────────────────────
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: borders.radius.md,
    borderWidth: borders.width.base,
    borderColor: colors.border,
    backgroundColor: colors.bgElevated,
    ...shadows.sm,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    ...shadows.none,
    transform: [{ translateX: 3 }, { translateY: 3 }],
  },
  chipPressed: {
    ...shadows.none,
    transform: [{ translateX: 3 }, { translateY: 3 }],
  },
  chipEmoji: {
    fontSize: 14,
  },
  chipLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  chipLabelSelected: {
    color: colors.textInverse,
  },
});
