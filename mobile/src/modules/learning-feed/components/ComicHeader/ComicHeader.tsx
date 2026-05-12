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
  return (
    <View style={styles.header}>
      <Pressable
        style={({ pressed }) => [styles.backBtn, pressed && styles.backBtnPressed]}
        onPress={onBack}>
        <Text style={styles.backText}>←</Text>
      </Pressable>
      <View style={styles.center}>
        <Text style={styles.title} numberOfLines={1}>{hobbyName} · Comic</Text>
        <Text style={styles.sub} numberOfLines={1}>{topicName}</Text>
      </View>
      <View style={[styles.badge, { backgroundColor: pageColor }]}>
        <Text style={styles.badgeText}>{page}/{totalPages}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
    backgroundColor: colors.darkSurface,
    borderBottomWidth: 2,
    borderBottomColor: colors.darkBorder,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.darkBorderStrong,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkSurfaceRaised,
  },
  backBtnPressed: { backgroundColor: colors.darkBorder },
  backText: { fontSize: 18, fontWeight: '900', color: colors.textInverse },
  center: { flex: 1 },
  title: { fontSize: 14, fontWeight: '900', color: colors.textInverse, letterSpacing: 0.5 },
  sub: { fontSize: 11, fontWeight: '600', color: colors.darkTextMuted, marginTop: 1 },
  badge: {
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    minWidth: 40,
    alignItems: 'center',
  },
  badgeText: { fontSize: 12, fontWeight: '900', color: colors.text },
});
