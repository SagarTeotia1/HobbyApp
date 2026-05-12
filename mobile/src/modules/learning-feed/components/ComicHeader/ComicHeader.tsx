import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

interface Props {
  hobbyName: string;
  topicName: string;
  page: number;
  totalPages: number;
  pageColor: string;
  onBack: () => void;
}

export function ComicHeader({ hobbyName, topicName, page, totalPages, pageColor, onBack }: Props) {
  const progressPct = totalPages > 0 ? (page / totalPages) * 100 : 0;

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [styles.backBtn, pressed && styles.backBtnPressed]}
          onPress={onBack}>
          <Text style={styles.backText}>←</Text>
        </Pressable>

        <View style={styles.titleBlock}>
          <View style={styles.hobbyRow}>
            <View style={styles.comicBadge}>
              <Text style={styles.comicBadgeText}>COMIC</Text>
            </View>
            <Text style={styles.hobbyName} numberOfLines={1}>{hobbyName.toUpperCase()}</Text>
          </View>
          <Text style={styles.topicName} numberOfLines={1}>{topicName}</Text>
        </View>

        <View style={[styles.pageBadge, { backgroundColor: pageColor, borderColor: colors.darkBorderStrong }]}>
          <Text style={styles.pageNum}>{page}</Text>
          <Text style={styles.pageSep}>/</Text>
          <Text style={styles.pageTotal}>{totalPages}</Text>
        </View>
      </View>

      {/* Progress track */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progressPct}%` as `${number}%`, backgroundColor: pageColor }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.darkSurface,
    borderBottomWidth: 2.5,
    borderBottomColor: colors.darkBorderStrong,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },

  backBtn: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.darkBorderStrong,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkSurfaceRaised,
    shadowColor: colors.yellow,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 0,
    shadowOpacity: 0.15,
    elevation: 2,
  },
  backBtnPressed: {
    transform: [{ translateX: 2 }, { translateY: 2 }],
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
  backText: { fontSize: 16, fontWeight: '900', color: colors.textInverse },

  titleBlock: { flex: 1, gap: 2 },
  hobbyRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  comicBadge: {
    backgroundColor: colors.yellow,
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  comicBadgeText: { fontSize: 7, fontWeight: '900', color: colors.text, letterSpacing: 1 },
  hobbyName: { fontSize: 11, fontWeight: '900', color: 'rgba(255,255,255,0.7)', letterSpacing: 0.8, flex: 1 },
  topicName: { fontSize: 14, fontWeight: '900', color: colors.textInverse, letterSpacing: -0.2 },

  pageBadge: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 2,
    borderRadius: radius.md,
    borderWidth: 2,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    minWidth: 44,
    justifyContent: 'center',
  },
  pageNum: { fontSize: 16, fontWeight: '900', color: colors.text },
  pageSep: { fontSize: 11, fontWeight: '700', color: 'rgba(0,0,0,0.4)' },
  pageTotal: { fontSize: 11, fontWeight: '700', color: 'rgba(0,0,0,0.55)' },

  progressTrack: {
    height: 3,
    backgroundColor: colors.darkBorderStrong,
  },
  progressFill: {
    height: 3,
  },
});
