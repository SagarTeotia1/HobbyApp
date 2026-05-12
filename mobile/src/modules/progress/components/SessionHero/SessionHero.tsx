import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../../../../app/theme';

interface Props {
  topicName: string;
}

export function SessionHero({ topicName }: Props) {
  return (
    <View style={styles.hero}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>SESSION COMPLETE</Text>
      </View>
      <Text style={styles.title}>Nice Work!</Text>
      <View style={styles.topicRow}>
        <View style={styles.topicDot} />
        <Text style={styles.topicName} numberOfLines={1}>{topicName.toUpperCase()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.lg },
  badge: {
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 6,
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
    shadowColor: colors.shadow,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 3,
  },
  badgeText: { fontSize: 10, fontWeight: '900', color: colors.textInverse, letterSpacing: 2 },
  title: { fontSize: 36, fontWeight: '900', color: colors.text, letterSpacing: -1 },
  topicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.bgElevated,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 6,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  topicDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.yellow },
  topicName: { fontSize: 11, fontWeight: '800', color: colors.text, letterSpacing: 1 },
});
