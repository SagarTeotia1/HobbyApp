import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useUserStore } from '../../../app/store/rootStore';
import { GAME_CONFIG } from '../../../shared/constants/gameConfig';
import { colors, spacing, radius } from '../../../app/theme';
import type { AppStackParamList } from '../../../app/navigation/types';
import { ROUTES } from '../../../app/navigation/routes';

type Nav = NativeStackNavigationProp<AppStackParamList, typeof ROUTES.PROGRESS>;
type Route = RouteProp<AppStackParamList, typeof ROUTES.PROGRESS>;

export function ProgressScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { hobbyId, videosWatched, xpEarned } = route.params;

  const xp = useUserStore((s) => s.xp);
  const level = useUserStore((s) => s.level);
  const streak = useUserStore((s) => s.streak);
  const updateStreak = useUserStore((s) => s.updateStreak);

  useEffect(() => {
    updateStreak();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const progressToNextLevel = (xp % GAME_CONFIG.LEVELS.XP_PER_LEVEL) / GAME_CONFIG.LEVELS.XP_PER_LEVEL;

  const handleContinue = () => navigation.navigate(ROUTES.ROADMAP);
  const handleDashboard = () => navigation.navigate(ROUTES.DASHBOARD);

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Session Complete 🎉</Text>

        {/* Stats row */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{videosWatched}</Text>
            <Text style={styles.statLabel}>Videos Watched</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValueXP}>+{xpEarned}</Text>
            <Text style={styles.statLabel}>XP Earned</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{streak > 0 ? `🔥 ${streak}` : '0'}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>

        {/* Level card */}
        <View style={styles.levelCard}>
          <View style={styles.levelRow}>
            <Text style={styles.levelLabel}>LEVEL {level}</Text>
            <Text style={styles.levelXP}>{xp % GAME_CONFIG.LEVELS.XP_PER_LEVEL} / {GAME_CONFIG.LEVELS.XP_PER_LEVEL} XP</Text>
          </View>
          <View style={styles.levelBarOuter}>
            <View style={[styles.levelBarInner, { width: `${progressToNextLevel * 100}%` }]} />
          </View>
          <Text style={styles.levelHint}>
            {Math.round((1 - progressToNextLevel) * GAME_CONFIG.LEVELS.XP_PER_LEVEL)} XP to level {level + 1}
          </Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            style={({ pressed }) => [styles.btnPrimary, pressed && styles.btnPressed]}
            onPress={handleContinue}>
            <Text style={styles.btnPrimaryText}>Continue Roadmap →</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.btnSecondary, pressed && styles.btnPressed]}
            onPress={handleDashboard}>
            <Text style={styles.btnSecondaryText}>View Dashboard</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxxl },
  heading: { fontSize: 26, fontWeight: '900', color: colors.text, marginBottom: spacing.sm },
  statsCard: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.bgElevated,
    shadowColor: colors.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 4,
    overflow: 'hidden',
  },
  statItem: { flex: 1, alignItems: 'center', paddingVertical: spacing.lg },
  statDivider: { width: 2, backgroundColor: colors.border },
  statValue: { fontSize: 22, fontWeight: '900', color: colors.text },
  statValueXP: { fontSize: 22, fontWeight: '900', color: colors.yellow },
  statLabel: { fontSize: 11, fontWeight: '700', color: colors.textMuted, marginTop: 4, letterSpacing: 0.5 },
  levelCard: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    padding: spacing.lg,
    shadowColor: colors.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 4,
    gap: spacing.sm,
  },
  levelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  levelLabel: { fontSize: 14, fontWeight: '900', color: colors.textInverse },
  levelXP: { fontSize: 12, fontWeight: '700', color: colors.primaryLight },
  levelBarOuter: {
    height: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: radius.pill,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  levelBarInner: {
    height: '100%',
    backgroundColor: colors.yellow,
    borderRadius: radius.pill,
  },
  levelHint: { fontSize: 12, fontWeight: '600', color: colors.primaryLight },
  actions: { gap: spacing.sm, marginTop: spacing.md },
  btnPrimary: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 4,
  },
  btnSecondary: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.bgElevated,
    paddingVertical: spacing.md,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 4,
  },
  btnPressed: {
    transform: [{ translateX: 4 }, { translateY: 4 }],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  btnPrimaryText: { fontSize: 15, fontWeight: '900', color: colors.textInverse },
  btnSecondaryText: { fontSize: 15, fontWeight: '800', color: colors.text },
});
