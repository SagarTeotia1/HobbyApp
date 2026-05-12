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
  return (
    <View style={styles.nav}>
      <View style={styles.dots}>
        {Array.from({ length: totalPages }, (_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i + 1 === page && [styles.dotActive, { backgroundColor: pageColor }],
              i + 1 < page && styles.dotDone,
            ]}
          />
        ))}
      </View>
      <View style={styles.row}>
        <Pressable
          style={({ pressed }) => [styles.btn, page === 1 && styles.btnDisabled, pressed && page > 1 && styles.btnPressed]}
          onPress={onPrev}
          disabled={page === 1}>
          <Text style={styles.btnText}>← Prev</Text>
        </Pressable>
        <View style={styles.counter}>
          <Text style={styles.counterText}>{pageLabel}</Text>
        </View>
        <Pressable
          style={({ pressed }) => [styles.btn, styles.btnNext, page === totalPages && styles.btnDisabled, pressed && page < totalPages && styles.btnPressed]}
          onPress={onNext}
          disabled={page === totalPages}>
          <Text style={[styles.btnText, { color: colors.textInverse }]}>
            {page === totalPages ? 'Done ✓' : 'Next →'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    backgroundColor: colors.darkSurface,
    borderTopWidth: 2,
    borderTopColor: colors.darkBorder,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    gap: spacing.sm,
  },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: spacing.sm, paddingVertical: spacing.xs },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.darkBorderStrong },
  dotActive: { width: 28, height: 8, borderRadius: 4 },
  dotDone: { backgroundColor: colors.darkBorderBright, borderWidth: 1, borderColor: colors.darkTextDim },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingBottom: spacing.sm },
  btn: {
    flex: 1,
    borderWidth: 2,
    borderColor: colors.darkBorderStrong,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    backgroundColor: colors.darkSurfaceRaised,
  },
  btnNext: { backgroundColor: colors.primary, borderColor: colors.primary },
  btnDisabled: { opacity: 0.3 },
  btnPressed: { opacity: 0.7 },
  btnText: { fontSize: 14, fontWeight: '900', color: colors.darkTextFaint },
  counter: { flex: 1, alignItems: 'center' },
  counterText: { fontSize: 12, fontWeight: '800', color: colors.darkTextDim, textTransform: 'uppercase', letterSpacing: 1 },
});
