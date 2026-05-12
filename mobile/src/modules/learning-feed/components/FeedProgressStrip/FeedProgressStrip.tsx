import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

interface Props {
  total: number;
  currentIndex: number;
  onOpenPlaylist: () => void;
}

export function FeedProgressStrip({ total, currentIndex, onOpenPlaylist }: Props) {
  return (
    <View style={styles.strip}>
      {/* Segmented bar */}
      <View style={styles.barRow}>
        {Array.from({ length: total }, (_, i) => (
          <View
            key={i}
            style={[
              styles.segment,
              i < currentIndex  && styles.segmentDone,
              i === currentIndex && styles.segmentActive,
            ]}
          />
        ))}
      </View>

      {/* Counter + playlist button */}
      <View style={styles.infoRow}>
        <Text style={styles.counter}>
          <Text style={styles.counterCurrent}>{currentIndex + 1}</Text>
          <Text style={styles.counterSep}> / </Text>
          <Text style={styles.counterTotal}>{total}</Text>
          <Text style={styles.counterLabel}> VIDEOS</Text>
        </Text>
        <Pressable
          style={({ pressed }) => [styles.listBtn, pressed && styles.listBtnPressed]}
          onPress={onOpenPlaylist}>
          <Text style={styles.listBtnIcon}>☰</Text>
          <Text style={styles.listBtnText}>PLAYLIST</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  strip: {
    backgroundColor: colors.bg,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: spacing.sm,
    gap: spacing.xs,
    borderBottomWidth: 2,
    borderBottomColor: colors.borderLight,
  },

  // Segmented track
  barRow: {
    flexDirection: 'row',
    gap: 3,
    height: 5,
  },
  segment: {
    flex: 1,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.borderLight,
  },
  segmentDone: {
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  segmentActive: {
    backgroundColor: colors.primary,
  },

  // Counter row
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  counter: {
    fontSize: 11,
  },
  counterCurrent: {
    fontWeight: '900',
    color: colors.primary,
    fontSize: 13,
  },
  counterSep: {
    fontWeight: '600',
    color: colors.textDim,
  },
  counterTotal: {
    fontWeight: '700',
    color: colors.textMuted,
  },
  counterLabel: {
    fontWeight: '700',
    color: colors.textDim,
    letterSpacing: 1,
  },
  listBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.bgElevated,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    shadowColor: colors.shadow,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 2,
  },
  listBtnPressed: {
    transform: [{ translateX: 2 }, { translateY: 2 }],
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
  listBtnIcon: { fontSize: 11, color: colors.text },
  listBtnText: {
    fontSize: 9,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: 1,
  },
});
