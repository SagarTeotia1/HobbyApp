import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';
import type { DifficultyLevel } from '../../../../shared/types/card.types';

interface Props {
  emoji: string;
  name: string;
  category?: string;
  level: number;
  skillLevel: DifficultyLevel;
  accentColor?: string;
}

export function DashboardHeroCard({ emoji, name, category, level, skillLevel, accentColor }: Props) {
  return (
    <View style={[styles.card, { backgroundColor: accentColor ?? colors.primary }]}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.name}>{name}</Text>
      {category ? <Text style={styles.category}>{category}</Text> : null}
      <View style={styles.badges}>
        <Text style={styles.levelBadge}>Level {level}</Text>
        <Text style={styles.skillBadge}>{skillLevel.toUpperCase()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.xl,
    shadowColor: colors.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 4,
    gap: spacing.xs,
  },
  emoji: { fontSize: 36 },
  name: { fontSize: 24, fontWeight: '900', color: colors.text },
  category: { fontSize: 13, fontWeight: '600', color: colors.text, opacity: 0.7 },
  badges: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.xs, alignItems: 'center' },
  levelBadge: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.text,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    backgroundColor: colors.bgElevated,
  },
  skillBadge: { fontSize: 12, fontWeight: '700', color: colors.textMuted, letterSpacing: 1 },
});
