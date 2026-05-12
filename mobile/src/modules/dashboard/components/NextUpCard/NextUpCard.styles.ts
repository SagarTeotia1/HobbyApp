import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../../../app/theme';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bgElevated,
    borderWidth: 3,
    borderColor: colors.border,
    borderRadius: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 6, height: 6 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 6,
    overflow: 'hidden',
  },

  // ── Dark teal header ──────────────────────────────────────────
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 3,
    borderBottomColor: colors.border,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  headerDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.yellow },
  headerLabel: { fontSize: 10, fontWeight: '900', color: colors.textInverse, letterSpacing: 2 },
  partChip: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 6,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  partChipText: { fontSize: 10, fontWeight: '900', color: colors.textInverse, letterSpacing: 1 },

  // ── Thumbnail strip (when real image available) ───────────────
  thumbnail: {
    height: 150,
    backgroundColor: colors.primary,
    overflow: 'hidden',
    position: 'relative',
  },
  thumbnailImage: { resizeMode: 'cover' },
  thumbGradient: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    height: 70,
    backgroundColor: 'transparent',
  },

  // Abstract art shapes (fallback)
  artBase: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: colors.primary,
    overflow: 'hidden',
  },
  artBlock1: {
    position: 'absolute',
    width: 160, height: 120,
    backgroundColor: colors.yellow,
    borderWidth: 3, borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 8,
    bottom: -40, left: -30,
    transform: [{ rotate: '-12deg' }],
  },
  artBlock2: {
    position: 'absolute',
    width: 90, height: 90,
    backgroundColor: '#B7D7F2',
    borderWidth: 2.5, borderColor: 'rgba(0,0,0,0.15)',
    borderRadius: 8,
    top: -25, right: -15,
    transform: [{ rotate: '15deg' }],
  },
  artBlock3: {
    position: 'absolute',
    width: 44, height: 44,
    backgroundColor: '#DCCCF7',
    borderWidth: 2, borderColor: 'rgba(0,0,0,0.12)',
    borderRadius: 6,
    top: 24, left: 90,
    transform: [{ rotate: '7deg' }],
  },
  artDot: {
    position: 'absolute',
    width: 12, height: 12, borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.5)',
    top: 14, right: 110,
  },
  artLine: {
    position: 'absolute',
    width: 60, height: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    bottom: 38, right: spacing.xl,
    transform: [{ rotate: '-4deg' }],
  },

  playBtnOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBtn: {
    width: 62, height: 62,
    borderRadius: 31,
    backgroundColor: colors.yellow,
    borderWidth: 3, borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 4,
    shadowColor: colors.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 0,
    shadowOpacity: 1,
  },
  playIcon: { fontSize: 22, color: colors.text },

  xpBadge: {
    position: 'absolute',
    top: spacing.sm, right: spacing.sm,
    backgroundColor: '#CFE1B9',
    borderWidth: 2, borderColor: colors.border,
    borderRadius: 6,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  xpBadgeText: { fontSize: 10, fontWeight: '900', color: colors.text, letterSpacing: 0.5 },

  // ── Info body ─────────────────────────────────────────────────
  infoBody: {
    padding: spacing.md,
    paddingBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: colors.borderLight,
  },
  infoLeft: { flex: 1, gap: 4 },
  topicName: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -0.5,
    lineHeight: 23,
    textTransform: 'uppercase',
  },
  tapHint: { fontSize: 11, fontWeight: '600', color: colors.textMuted },

  // Chips row below topic name
  chipRow: { flexDirection: 'row', gap: spacing.xs, marginTop: 2 },
  chip: {
    borderWidth: 2, borderColor: colors.border,
    borderRadius: 6,
    paddingHorizontal: 7, paddingVertical: 3,
  },
  chipText: { fontSize: 9, fontWeight: '900', color: colors.text, letterSpacing: 0.5 },

  // Big play button on right
  bigPlayBtn: {
    width: 58, height: 58,
    borderRadius: 10,
    backgroundColor: colors.primary,
    borderWidth: 3, borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 4,
  },
  bigPlayBtnPressed: {
    transform: [{ translateX: 4 }, { translateY: 4 }],
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
  bigPlayIcon: { fontSize: 20, color: colors.textInverse },
  bigPlayLabel: { fontSize: 7, fontWeight: '900', color: 'rgba(255,255,255,0.6)', letterSpacing: 1 },

  // ── Info strip (kept for compatibility) ───────────────────────
  infoStrip: { padding: spacing.md, gap: 2, backgroundColor: colors.bgElevated },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: 2 },
  upNextBadge: {
    backgroundColor: colors.primary,
    borderRadius: 6,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  upNextText: { fontSize: 9, fontWeight: '900', color: colors.textInverse, letterSpacing: 1.5 },
  partLabel: { fontSize: 10, fontWeight: '900', color: colors.textMuted, letterSpacing: 1 },
  title: { fontSize: 17, fontWeight: '900', color: colors.text, letterSpacing: -0.3, textTransform: 'uppercase' },
  subtitle: { fontSize: 12, fontWeight: '600', color: colors.textMuted },

  // kept so TS doesn't break if referenced elsewhere
  cardPressed: {
    transform: [{ translateX: 5 }, { translateY: 5 }],
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
});
