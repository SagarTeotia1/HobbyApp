import { StyleSheet, Dimensions } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
export const COMIC_IMAGE_WIDTH = SCREEN_WIDTH - spacing.lg * 2;
// Manga panel proportions: 2:3
export const COMIC_IMAGE_HEIGHT = Math.round(COMIC_IMAGE_WIDTH * 1.4);

export const styles = StyleSheet.create({
  root: {
    margin: spacing.lg,
    marginTop: spacing.md,
    borderWidth: 3,
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.bgElevated,
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 5,
  },

  // ── Header ────────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primary,
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  headerIcon: { fontSize: 16 },
  headerTitle: {
    fontSize: 11,
    fontWeight: '900',
    color: colors.textInverse,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  headerBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  headerBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.textInverse,
  },

  // ── Image panel ───────────────────────────────────────────────────
  imageWrap: {
    width: '100%',
    height: COMIC_IMAGE_HEIGHT,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },

  // ── Loading state ─────────────────────────────────────────────────
  loadingWrap: {
    width: '100%',
    height: COMIC_IMAGE_HEIGHT,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  loadingIcon: { fontSize: 36 },
  loadingText: {
    fontSize: 13,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
  },
  loadingSubText: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.4)',
    textAlign: 'center',
  },

  // ── Error state ───────────────────────────────────────────────────
  errorWrap: {
    width: '100%',
    height: COMIC_IMAGE_HEIGHT,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
  },
  errorIcon: { fontSize: 32 },
  errorText: {
    fontSize: 13,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
  },
  retryBtn: {
    marginTop: spacing.sm,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
    backgroundColor: colors.primary,
  },
  retryBtnText: { fontSize: 12, fontWeight: '900', color: colors.textInverse },

  // ── Navigation footer ─────────────────────────────────────────────
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderTopWidth: 2,
    borderTopColor: colors.border,
    backgroundColor: colors.bg,
  },
  navBtn: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bgElevated,
    shadowColor: colors.shadow,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 2,
  },
  navBtnDisabled: {
    opacity: 0.3,
    shadowOpacity: 0,
    elevation: 0,
  },
  navBtnPressed: {
    transform: [{ translateX: 2 }, { translateY: 2 }],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  navBtnText: { fontSize: 16, fontWeight: '900', color: colors.text },

  // ── Page dots ─────────────────────────────────────────────────────
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  dotActive: {
    width: 20,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  dotDone: {
    backgroundColor: colors.primaryLight,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
});
