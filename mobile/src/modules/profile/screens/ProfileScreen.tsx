import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Pressable,
  Text,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQueryClient } from '@tanstack/react-query';
import { Typography } from '../../../shared/components/ui/Typography/Typography';
import { colors, spacing } from '../../../app/theme';
import { borders } from '../../../app/theme/borders';
import { shadows } from '../../../app/theme/shadows';
import { useUserStore } from '../../../app/store/rootStore';
import { useLearningFeedStore } from '../../learning-feed/store/learningFeed.store';

export function ProfileScreen() {
  const queryClient = useQueryClient();
  const reset = useUserStore((s) => s.reset);
  const resetFeed = useLearningFeedStore((s) => s.resetAll);
  const user = useUserStore((s) => s.user);
  const [pressed, setPressed] = useState(false);

  const handleReset = () => {
    Alert.alert(
      'Reset Profile?',
      'This will permanently erase all XP, progress, roadmap data, and streaks. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset Everything',
          style: 'destructive',
          onPress: () => {
            reset();
            resetFeed();
            queryClient.clear();
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <Typography variant="heading">Profile</Typography>
        </View>

        {user && (
          <View style={styles.statsCard}>
            <View style={styles.statRow}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{user.xp}</Text>
                <Text style={styles.statLabel}>XP</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.stat}>
                <Text style={styles.statValue}>Lv {user.level}</Text>
                <Text style={styles.statLabel}>Level</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.stat}>
                <Text style={[styles.statValue, styles.streakValue]}>
                  {user.streak}d
                </Text>
                <Text style={styles.statLabel}>Streak</Text>
              </View>
            </View>
          </View>
        )}

        <View style={styles.dangerSection}>
          <View style={styles.dangerHeader}>
            <Text style={styles.dangerBadge}>DANGER ZONE</Text>
          </View>

          <View style={styles.dangerCard}>
            <Text style={styles.dangerTitle}>Reset Profile</Text>
            <Text style={styles.dangerDesc}>
              Permanently erases all your data. This cannot be undone.
            </Text>

            <View style={styles.dangerList}>
              {['All XP and level progress', 'Roadmap and topic unlocks', 'Streak and daily history', 'Saved flashcards'].map((item) => (
                <View key={item} style={styles.dangerListItem}>
                  <View style={styles.dangerDot} />
                  <Text style={styles.dangerListText}>{item}</Text>
                </View>
              ))}
            </View>

            <Pressable
              onPressIn={() => setPressed(true)}
              onPressOut={() => setPressed(false)}
              onPress={handleReset}
              style={[styles.resetBtn, pressed && styles.resetBtnPressed]}>
              <Text style={styles.resetBtnLabel}>Reset Profile</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.xl,
  },
  header: {
    gap: spacing.xs,
  },

  // ─── Stats card ────────────────────────────────────────────────
  statsCard: {
    backgroundColor: colors.bgElevated,
    borderWidth: borders.width.base,
    borderColor: colors.border,
    borderRadius: borders.radius.md,
    ...shadows.md,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.lg,
    gap: spacing.xs,
  },
  statDivider: {
    width: borders.width.base,
    height: 40,
    backgroundColor: colors.border,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.5,
  },
  streakValue: {
    color: colors.streak,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textDim,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },

  // ─── Danger section ────────────────────────────────────────────
  dangerSection: {
    gap: spacing.sm,
  },
  dangerHeader: {
    flexDirection: 'row',
  },
  dangerBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.danger,
    letterSpacing: 1.5,
    borderWidth: borders.width.base,
    borderColor: colors.danger,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
  },
  dangerCard: {
    backgroundColor: colors.bgElevated,
    borderWidth: borders.width.base,
    borderColor: colors.danger,
    borderRadius: borders.radius.md,
    padding: spacing.lg,
    gap: spacing.md,
    shadowColor: colors.danger,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 6,
  },
  dangerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  dangerDesc: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textMuted,
    lineHeight: 20,
  },
  dangerList: {
    gap: spacing.xs,
  },
  dangerListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dangerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.danger,
  },
  dangerListText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textMuted,
  },

  // ─── Reset button ──────────────────────────────────────────────
  resetBtn: {
    backgroundColor: colors.danger,
    borderWidth: borders.width.base,
    borderColor: colors.border,
    borderRadius: borders.radius.md,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: spacing.xs,
    ...shadows.md,
  },
  resetBtnPressed: {
    transform: [{ translateX: 4 }, { translateY: 4 }],
    ...shadows.none,
  },
  resetBtnLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textInverse,
    letterSpacing: 0.3,
  },
});
