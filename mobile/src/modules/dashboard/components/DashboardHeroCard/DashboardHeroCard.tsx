import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';
import type { DifficultyLevel } from '../../../../shared/types/card.types';

interface Props {
  emoji: string;
  name: string;
  category?: string;
  level: number;
  skillLevel: DifficultyLevel;
  accentColor?: string;
  onChangeHobby?: () => void;
}

export function DashboardHeroCard({ emoji, name, category, level, skillLevel, accentColor, onChangeHobby }: Props) {
  return (
    <View style={[styles.card, { backgroundColor: accentColor ?? colors.primary }]}>
      <View style={styles.topRow}>
        <View style={styles.titleWrap}>
          <Text style={styles.emoji}>{emoji}</Text>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
        </View>
        {onChangeHobby && (
          <Pressable
            style={({ pressed }) => [styles.changeBtn, pressed && styles.changeBtnPressed]}
            onPress={onChangeHobby}>
            <Text style={styles.changeBtnText}>CHANGE ➔</Text>
          </Pressable>
        )}
      </View>
      
      {category ? <Text style={styles.category}>{category}</Text> : null}
      
      <View style={styles.badges}>
        <View style={styles.levelBadge}>
          <Text style={styles.levelBadgeText}>LEVEL {level}</Text>
        </View>
        <View style={styles.skillBadge}>
          <Text style={styles.skillBadgeText}>{skillLevel.toUpperCase()}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 4,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.xl,
    shadowColor: colors.shadow,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 5,
    gap: spacing.sm,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  emoji: { fontSize: 32 },
  name: { fontSize: 28, fontWeight: '900', color: colors.text, flexShrink: 1, textTransform: 'uppercase' },
  changeBtn: {
    backgroundColor: colors.bgElevated,
    borderWidth: 3,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    shadowColor: colors.shadow,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    shadowOpacity: 1,
  },
  changeBtnPressed: {
    transform: [{ translateX: 3 }, { translateY: 3 }],
    shadowOffset: { width: 0, height: 0 },
  },
  changeBtnText: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.text,
  },
  category: { fontSize: 14, fontWeight: '700', color: colors.text, opacity: 0.8, textTransform: 'uppercase' },
  badges: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.xs, alignItems: 'center' },
  levelBadge: {
    borderWidth: 3,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    backgroundColor: colors.bgElevated,
    shadowColor: colors.shadow,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 0,
    shadowOpacity: 1,
  },
  levelBadgeText: {
    fontSize: 13,
    fontWeight: '900',
    color: colors.text,
  },
  skillBadge: {
    borderWidth: 2,
    borderColor: colors.textMuted,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
  },
  skillBadgeText: { fontSize: 11, fontWeight: '800', color: colors.textMuted, letterSpacing: 1 },
});
