import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

interface Props {
  page: number;
  totalPages: number;
  pageLabel: string;
  pageColor: string;
  onPrev: () => void;
  onNext: () => void;
}

export function ComicBottomNav({ page, totalPages, pageLabel, pageColor, onPrev, onNext }: Props) {
  const isFirst = page === 1;
  const isLast = page === totalPages;

  return (
    <View style={styles.nav}>
      {/* Segmented progress bar */}
      <View style={styles.segmentRow}>
        {Array.from({ length: totalPages }, (_, i) => (
          <View
            key={i}
            style={[
              styles.segment,
              i + 1 < page  && styles.segmentDone,
              i + 1 === page && [styles.segmentActive, { backgroundColor: pageColor }],
            ]}
          />
        ))}
      </View>

      {/* Page label pill */}
      <View style={styles.labelRow}>
        <View style={[styles.labelPill, { backgroundColor: pageColor, borderColor: colors.darkBorderStrong }]}>
          <Text style={styles.labelText}>{pageLabel.toUpperCase()}</Text>
        </View>
        <Text style={styles.pageCounter}>
          <Text style={styles.pageCounterCurrent}>{page}</Text>
          <Text style={styles.pageCounterSep}> of </Text>
          <Text style={styles.pageCounterTotal}>{totalPages}</Text>
        </Text>
      </View>

      {/* Navigation buttons */}
      <View style={styles.btnRow}>
        <Pressable
          style={({ pressed }) => [
            styles.prevBtn,
            isFirst && styles.btnDisabled,
            pressed && !isFirst && styles.prevBtnPressed,
          ]}
          onPress={onPrev}
          disabled={isFirst}>
          <Text style={styles.prevBtnText}>← PREV</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.nextBtn,
            { backgroundColor: isLast ? colors.mint : pageColor },
            isLast && styles.nextBtnDone,
            pressed && styles.nextBtnPressed,
          ]}
          onPress={onNext}>
          <Text style={styles.nextBtnText}>
            {isLast ? 'FINISH ✓' : 'NEXT →'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    backgroundColor: colors.darkSurface,
    borderTopWidth: 2.5,
    borderTopColor: colors.darkBorderStrong,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    gap: spacing.sm,
  },

  // Segment bar
  segmentRow: { flexDirection: 'row', gap: 3, height: 4 },
  segment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.darkBorderBright,
  },
  segmentDone: { backgroundColor: colors.darkTextFaint },
  segmentActive: { borderRadius: 2 },

  // Label row
  labelRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  labelPill: {
    borderRadius: radius.pill,
    borderWidth: 2,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  labelText: { fontSize: 9, fontWeight: '900', color: colors.text, letterSpacing: 1.5 },
  pageCounter: {},
  pageCounterCurrent: { fontSize: 14, fontWeight: '900', color: colors.textInverse },
  pageCounterSep: { fontSize: 11, fontWeight: '600', color: colors.darkTextFaint },
  pageCounterTotal: { fontSize: 11, fontWeight: '700', color: colors.darkTextMuted },

  // Buttons
  btnRow: { flexDirection: 'row', gap: spacing.sm },
  prevBtn: {
    flex: 1,
    borderWidth: 2,
    borderColor: colors.darkBorderStrong,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    backgroundColor: colors.darkSurfaceRaised,
    shadowColor: colors.darkBorderBright,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 2,
  },
  prevBtnPressed: {
    transform: [{ translateX: 2 }, { translateY: 2 }],
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
  prevBtnText: { fontSize: 13, fontWeight: '900', color: colors.darkTextFaint, letterSpacing: 1 },
  btnDisabled: { opacity: 0.25 },

  nextBtn: {
    flex: 2,
    borderWidth: 2.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    shadowColor: colors.border,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 3,
  },
  nextBtnDone: { borderColor: colors.mint },
  nextBtnPressed: {
    transform: [{ translateX: 3 }, { translateY: 3 }],
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
  nextBtnText: { fontSize: 13, fontWeight: '900', color: colors.text, letterSpacing: 1 },
});
