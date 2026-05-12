import React from 'react';
import { View, Text, Image, Pressable, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

const { width: W } = Dimensions.get('window');

interface Props {
  imageUrl?: string;
  isLoading: boolean;
  isError: boolean;
  pageLabel: string;
  pageColor: string;
  onRetry: () => void;
}

export function ComicImageArea({ imageUrl, isLoading, isError, pageLabel, pageColor, onRetry }: Props) {
  return (
    <View style={styles.area}>
      {/* Decorative corner marks */}
      <View style={[styles.cornerTL, { borderColor: pageColor }]} />
      <View style={[styles.cornerBR, { borderColor: pageColor }]} />

      {isLoading ? (
        <View style={styles.stateWrap}>
          <View style={styles.loadingCard}>
            {/* Manga kanji decoration */}
            <View style={styles.kanjiWrap}>
              <Text style={styles.kanjiText}>漫</Text>
              <Text style={styles.kanjiSub}>MANGA</Text>
            </View>

            <View style={styles.loadingDivider} />

            <ActivityIndicator color={colors.yellow} size="large" />
            <Text style={styles.loadingTitle}>AI IS DRAWING</Text>
            <Text style={styles.loadingHint}>Generating your panel with Flux AI…</Text>

            <View style={styles.timingBadge}>
              <Text style={styles.timingText}>⏱ 20–40 SECONDS</Text>
            </View>
          </View>
        </View>
      ) : isError || !imageUrl ? (
        <View style={styles.stateWrap}>
          <View style={styles.errorCard}>
            <View style={styles.errorIconWrap}>
              <Text style={styles.errorIcon}>⚠️</Text>
            </View>
            <Text style={styles.errorTitle}>PANEL FAILED</Text>
            <Text style={styles.errorText}>Couldn't generate this comic panel.</Text>
            <Pressable
              style={({ pressed }) => [styles.retryBtn, pressed && styles.retryBtnPressed]}
              onPress={onRetry}>
              <Text style={styles.retryText}>REGENERATE</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" />
      )}

      {/* Page label floating badge */}
      {imageUrl && !isLoading && !isError && (
        <View style={[styles.labelBadge, { backgroundColor: pageColor }]}>
          <Text style={styles.labelText}>{pageLabel.toUpperCase()}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: colors.darkSurface,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },

  // Comic panel corner markers
  cornerTL: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 20,
    height: 20,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: colors.yellow,
  },
  cornerBR: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 20,
    height: 20,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: colors.yellow,
  },

  image: { width: W, height: '100%' },

  // Shared state wrapper
  stateWrap: { paddingHorizontal: spacing.xl, width: '100%', alignItems: 'center' },

  // Loading card
  loadingCard: {
    backgroundColor: colors.darkSurfaceRaised,
    borderWidth: 2.5,
    borderColor: colors.darkBorderStrong,
    borderRadius: radius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.md,
    width: '100%',
    shadowColor: colors.yellow,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 0,
    shadowOpacity: 0.15,
    elevation: 4,
  },
  kanjiWrap: { alignItems: 'center', gap: 2 },
  kanjiText: { fontSize: 56, color: colors.yellow, fontWeight: '900', lineHeight: 60 },
  kanjiSub: { fontSize: 8, fontWeight: '900', color: colors.darkTextDim, letterSpacing: 3 },
  loadingDivider: { width: 40, height: 2, backgroundColor: colors.darkBorderStrong, borderRadius: 1 },
  loadingTitle: { fontSize: 14, fontWeight: '900', color: colors.textInverse, letterSpacing: 2 },
  loadingHint: { fontSize: 12, fontWeight: '600', color: colors.darkTextMuted, textAlign: 'center' },
  timingBadge: {
    backgroundColor: colors.darkSurface,
    borderWidth: 1.5,
    borderColor: colors.darkBorderStrong,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
  },
  timingText: { fontSize: 9, fontWeight: '800', color: colors.darkTextFaint, letterSpacing: 1 },

  // Error card
  errorCard: {
    backgroundColor: colors.darkSurfaceRaised,
    borderWidth: 2.5,
    borderColor: colors.coral,
    borderRadius: radius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.md,
    width: '100%',
    shadowColor: colors.coral,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 0,
    shadowOpacity: 0.2,
    elevation: 4,
  },
  errorIconWrap: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    backgroundColor: 'rgba(255,107,107,0.1)',
    borderWidth: 2,
    borderColor: colors.coral,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorIcon: { fontSize: 26 },
  errorTitle: { fontSize: 14, fontWeight: '900', color: colors.coral, letterSpacing: 2 },
  errorText: { fontSize: 12, fontWeight: '600', color: colors.darkTextMuted, textAlign: 'center' },
  retryBtn: {
    backgroundColor: colors.yellow,
    borderWidth: 2.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    shadowColor: colors.yellow,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    shadowOpacity: 0.4,
    elevation: 3,
  },
  retryBtnPressed: {
    transform: [{ translateX: 3 }, { translateY: 3 }],
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
  retryText: { fontSize: 12, fontWeight: '900', color: colors.text, letterSpacing: 1.5 },

  // Label badge
  labelBadge: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderWidth: 2,
    borderColor: colors.border,
  },
  labelText: { fontSize: 10, fontWeight: '900', color: colors.text, letterSpacing: 1.5 },
});
