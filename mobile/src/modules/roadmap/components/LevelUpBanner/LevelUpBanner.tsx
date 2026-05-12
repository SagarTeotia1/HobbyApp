import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

interface Props {
  nextSkillLevel: string | null;
  skillLevel: string;
  totalCount: number;
  onLevelUp: () => void;
  onDismiss: () => void;
}

export function LevelUpBanner({ nextSkillLevel, skillLevel, totalCount, onLevelUp, onDismiss }: Props) {
  if (nextSkillLevel) {
    return (
      <View style={styles.card}>
        <Text style={styles.emoji}>🏆</Text>
        <Text style={styles.title}>Roadmap Complete!</Text>
        <Text style={styles.body}>
          You've mastered all {totalCount} topics at {skillLevel} level.{'\n'}
          Ready to unlock the <Text style={styles.highlight}>{nextSkillLevel}</Text> roadmap?
        </Text>
        <Pressable
          style={({ pressed }) => [styles.levelUpBtn, pressed && styles.btnPressed]}
          onPress={onLevelUp}>
          <Text style={styles.levelUpBtnText}>
            Generate {nextSkillLevel.charAt(0).toUpperCase() + nextSkillLevel.slice(1)} Roadmap →
          </Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.dismissBtn, pressed && styles.btnPressed]}
          onPress={onDismiss}>
          <Text style={styles.dismissText}>Maybe later</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.emoji}>🎓</Text>
      <Text style={styles.title}>Mastery Achieved!</Text>
      <Text style={styles.body}>You've completed all levels for this hobby. You're a master!</Text>
      <Pressable
        style={({ pressed }) => [styles.dismissBtn, styles.dismissBtnSolid, pressed && styles.btnPressed]}
        onPress={onDismiss}>
        <Text style={styles.dismissTextSolid}>🎉 Awesome, Dismiss</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.yellow,
    padding: spacing.lg,
    marginBottom: spacing.md,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 4,
    gap: spacing.sm,
  },
  emoji: { fontSize: 40 },
  title: { fontSize: 20, fontWeight: '900', color: colors.text, textAlign: 'center' },
  body: { fontSize: 13, fontWeight: '600', color: colors.text, textAlign: 'center', lineHeight: 20, opacity: 0.85 },
  highlight: { fontWeight: '900', color: colors.primary },
  levelUpBtn: {
    marginTop: spacing.xs,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    shadowColor: colors.shadow,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 3,
    width: '100%',
    alignItems: 'center',
  },
  levelUpBtnText: { fontSize: 14, fontWeight: '900', color: colors.textInverse },
  dismissBtn: {
    width: '100%',
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
    shadowColor: colors.shadow,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 2,
  },
  dismissBtnSolid: { backgroundColor: colors.primary, borderColor: colors.primary },
  dismissText: { fontSize: 13, fontWeight: '800', color: colors.text },
  dismissTextSolid: { fontSize: 13, fontWeight: '800', color: colors.textInverse },
  btnPressed: {
    transform: [{ translateX: 2 }, { translateY: 2 }],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
});
