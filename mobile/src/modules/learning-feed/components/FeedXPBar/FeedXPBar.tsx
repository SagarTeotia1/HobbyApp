import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

interface Props {
  xpDelta: number;
  streak: number;
  completedTopics: number;
  totalTopics: number;
}

export function FeedXPBar({ xpDelta, streak, completedTopics, totalTopics }: Props) {
  const deltaOpacity = useRef(new Animated.Value(0)).current;
  const deltaTranslate = useRef(new Animated.Value(0)).current;
  const barWidth = useRef(new Animated.Value(0)).current;

  const progress = totalTopics > 0 ? Math.min(completedTopics / totalTopics, 1) : 0;

  useEffect(() => {
    Animated.timing(barWidth, {
      toValue: progress,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [progress, barWidth]);

  useEffect(() => {
    if (xpDelta <= 0) return;
    deltaOpacity.setValue(1);
    deltaTranslate.setValue(0);
    Animated.parallel([
      Animated.timing(deltaTranslate, { toValue: -20, duration: 500, useNativeDriver: true }),
      Animated.sequence([
        Animated.delay(250),
        Animated.timing(deltaOpacity, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]),
    ]).start();
  }, [xpDelta, deltaOpacity, deltaTranslate]);

  const pct = Math.round(progress * 100);

  return (
    <View style={styles.root}>
      <View style={styles.row}>
        {/* Labels */}
        <View style={styles.labelRow}>
          <Text style={styles.topicLabel}>
            {completedTopics}/{totalTopics} topics
          </Text>
          <Text style={styles.pctLabel}>{pct}%</Text>
        </View>

        {/* Streak — only when active */}
        {streak > 0 && (
          <View style={styles.streakChip}>
            <Text style={styles.streakFire}>🔥</Text>
            <Text style={styles.streakCount}>{streak}</Text>
          </View>
        )}
      </View>

      {/* Progress bar */}
      <View style={styles.barOuter}>
        <Animated.View
          style={[
            styles.barInner,
            {
              width: barWidth.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
        {/* XP float */}
        <Animated.Text
          style={[
            styles.deltaText,
            { opacity: deltaOpacity, transform: [{ translateY: deltaTranslate }] },
          ]}>
          +{xpDelta} XP
        </Animated.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    backgroundColor: colors.bg,
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
    gap: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  topicLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  pctLabel: {
    fontSize: 11,
    fontWeight: '900',
    color: colors.primary,
  },
  streakChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    backgroundColor: colors.yellow,
  },
  streakFire: { fontSize: 12 },
  streakCount: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.text,
  },
  barOuter: {
    height: 10,
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.border,
    overflow: 'visible',
    position: 'relative',
  },
  barInner: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  deltaText: {
    position: 'absolute',
    right: 0,
    top: -22,
    fontSize: 12,
    fontWeight: '900',
    color: colors.yellow,
  },
});
