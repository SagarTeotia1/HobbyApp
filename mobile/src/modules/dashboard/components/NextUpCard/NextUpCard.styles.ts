import { StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bgElevated,
    borderWidth: 3,
    borderColor: colors.border,
    borderRadius: radius.xl,
    shadowColor: colors.shadow,
    shadowOffset: { width: 6, height: 6 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 6,
    overflow: 'hidden',
  },
  cardPressed: {
    transform: [{ translateX: 5 }, { translateY: 5 }],
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },

  // ── Thumbnail (real or abstract fallback) ────────────────────
  thumbnail: {
    height: 160,
    backgroundColor: '#F0EAE0',
    borderBottomWidth: 3,
    borderBottomColor: colors.border,
    overflow: 'hidden',
    position: 'relative',
  },
  thumbnailImage: {
    resizeMode: 'cover',
  },

  // Large yellow rotated block — bottom-left
  blockYellow: {
    position: 'absolute',
    width: 150,
    height: 110,
    backgroundColor: colors.yellow,
    borderWidth: 3,
    borderColor: colors.border,
    borderRadius: radius.md,
    bottom: -24,
    left: -24,
    transform: [{ rotate: '-10deg' }],
  },

  // Teal block — top-right
  blockTeal: {
    position: 'absolute',
    width: 90,
    height: 90,
    backgroundColor: '#B7D7F2',
    borderWidth: 3,
    borderColor: colors.border,
    borderRadius: radius.md,
    top: -20,
    right: -14,
    transform: [{ rotate: '14deg' }],
  },

  // Purple small square — mid-left
  blockPurple: {
    position: 'absolute',
    width: 40,
    height: 40,
    backgroundColor: '#DCCCF7',
    borderWidth: 2.5,
    borderColor: colors.border,
    borderRadius: spacing.xs,
    top: spacing.lg,
    left: 80,
    transform: [{ rotate: '8deg' }],
  },

  // Solid dot
  dotAccent: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.border,
    top: spacing.sm,
    right: 100,
  },

  // Horizontal line decoration
  lineDecor: {
    position: 'absolute',
    width: 70,
    height: 3,
    backgroundColor: colors.border,
    bottom: 40,
    right: spacing.xl,
    borderRadius: 2,
    transform: [{ rotate: '-5deg' }],
  },

  // Fullscreen overlay — centers the play button
  playBtnOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  playBtn: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.bgElevated,
    borderWidth: 3,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 5,
    shadowColor: colors.shadow,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 0,
    shadowOpacity: 1,
  },
  playIcon: {
    fontSize: 26,
    color: colors.text,
    lineHeight: 30,
  },

  // XP reward badge — top-right corner
  xpBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: '#CFE1B9',
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    zIndex: 10,
  },
  xpBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: 0.5,
  },

  // ── Info strip ────────────────────────────────────────────────
  infoStrip: {
    padding: spacing.md,
    gap: spacing.xxs,
    backgroundColor: colors.bgElevated,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xxs,
  },
  upNextBadge: {
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  upNextText: {
    fontSize: 9,
    fontWeight: '900',
    color: colors.textInverse,
    letterSpacing: 1.5,
  },
  partLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.textMuted,
    letterSpacing: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -0.3,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
  },
});
