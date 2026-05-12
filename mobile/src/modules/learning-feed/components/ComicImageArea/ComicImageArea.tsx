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
      {isLoading ? (
        <View style={styles.loadingWrap}>
          <Text style={styles.manga}>漫</Text>
          <ActivityIndicator color={colors.yellow} size="large" style={{ marginTop: spacing.lg }} />
          <Text style={styles.loadingTitle}>AI is drawing your panel...</Text>
          <Text style={styles.loadingHint}>Using Flux · may take 20–40s</Text>
        </View>
      ) : isError || !imageUrl ? (
        <View style={styles.errorWrap}>
          <Text style={styles.errorIcon}>⚠</Text>
          <Text style={styles.errorText}>Panel generation failed</Text>
          <Pressable style={styles.retryBtn} onPress={onRetry}>
            <Text style={styles.retryText}>Retry</Text>
          </Pressable>
        </View>
      ) : (
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" />
      )}

      {imageUrl && !isLoading && (
        <View style={[styles.labelBadge, { backgroundColor: pageColor }]}>
          <Text style={styles.labelText}>{pageLabel.toUpperCase()}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  area: { flex: 1, backgroundColor: colors.darkSurface, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  image: { width: W, height: '100%' },
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
  loadingWrap: { alignItems: 'center', gap: spacing.sm, paddingHorizontal: spacing.xl },
  manga: { fontSize: 64, color: colors.yellow, fontWeight: '900' },
  loadingTitle: { fontSize: 16, fontWeight: '800', color: colors.textInverse, textAlign: 'center', marginTop: spacing.sm },
  loadingHint: { fontSize: 12, fontWeight: '600', color: colors.darkTextMuted, textAlign: 'center' },
  errorWrap: { alignItems: 'center', gap: spacing.md },
  errorIcon: { fontSize: 40, color: colors.coral },
  errorText: { fontSize: 14, fontWeight: '700', color: colors.darkTextFaint },
  retryBtn: {
    borderWidth: 2,
    borderColor: colors.yellow,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.yellow,
  },
  retryText: { fontSize: 13, fontWeight: '900', color: colors.text },
});
