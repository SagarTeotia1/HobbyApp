import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

interface Props {
  xp: number;
  xpDelta: number;
  level: number;
  streak: number;
}

const XP_PER_LEVEL = 500;

export function FeedXPBar({ xp, xpDelta, level, streak }: Props) {
  const deltaOpacity = useRef(new Animated.Value(0)).current;
  const deltaTranslate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (xpDelta <= 0) return;
    deltaOpacity.setValue(1);
    deltaTranslate.setValue(0);
    Animated.parallel([
      Animated.timing(deltaTranslate, { toValue: -24, duration: 600, useNativeDriver: true }),
      Animated.sequence([
        Animated.delay(300),
        Animated.timing(deltaOpacity, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]),
    ]).start();
  }, [xp, xpDelta, deltaOpacity, deltaTranslate]);

  const xpInLevel = xp % XP_PER_LEVEL;
  const progress = xpInLevel / XP_PER_LEVEL;

  return (
    <View style={styles.root}>
      <View style={styles.row}>
        {/* Level badge */}
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>Lv{level}</Text>
        </View>

        {/* XP bar */}
        <View style={styles.barContainer}>
          <View style={styles.barOuter}>
            <View style={[styles.barInner, { width: `${progress * 100}%` }]} />
          </View>
          <Animated.Text
            style={[styles.deltaText, { opacity: deltaOpacity, transform: [{ translateY: deltaTranslate }] }]}>
            +{xpDelta} XP
          </Animated.Text>
        </View>

        {/* Streak */}
        {streak > 0 && (
          <View style={styles.streakBadge}>
            <Text style={styles.streakText}>🔥{streak}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.bg,
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  levelBadge: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    backgroundColor: colors.primary,
  },
  levelText: {
    fontSize: 11,
    fontWeight: '900',
    color: colors.textInverse,
  },
  barContainer: {
    flex: 1,
    position: 'relative',
  },
  barOuter: {
    height: 10,
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  barInner: {
    height: '100%',
    backgroundColor: colors.yellow,
    borderRadius: radius.pill,
  },
  deltaText: {
    position: 'absolute',
    right: 0,
    top: -18,
    fontSize: 12,
    fontWeight: '900',
    color: colors.yellow,
  },
  streakBadge: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    backgroundColor: colors.bgElevated,
  },
  streakText: {
    fontSize: 11,
    fontWeight: '900',
    color: colors.text,
  },
});
