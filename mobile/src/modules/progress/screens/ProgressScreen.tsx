import React, { useEffect } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SessionHero } from '../components/SessionHero/SessionHero';
import { XPBanner } from '../components/XPBanner/XPBanner';
import { SessionStatsRow } from '../components/SessionStatsRow/SessionStatsRow';
import { RoadmapProgressCard } from '../components/RoadmapProgressCard/RoadmapProgressCard';
import { useUserStore } from '../../../app/store/rootStore';
import { useRoadmapStore } from '../../roadmap/store/roadmap.store';
import { useRoadmap } from '../../roadmap/hooks/useRoadmap';
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
  const getCompletedTopicCount = useRoadmapStore((s) => s.getCompletedTopicCount);
  const { roadmap } = useRoadmap(hobbyId);

  const completedTopics = getCompletedTopicCount(hobbyId);
  const totalTopics = roadmap?.stages.length ?? 0;

  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <SessionHero />
        <XPBanner xpEarned={xpEarned} />
        <SessionStatsRow videosWatched={videosWatched} streak={streak} level={level} />
        <RoadmapProgressCard
          completedTopics={completedTopics}
          totalTopics={totalTopics}
          xp={xp}
          level={level}
        />
      </View>

      <View style={styles.actions}>
        <Pressable
          style={({ pressed }) => [styles.btnPrimary, pressed && styles.btnPressed]}
          onPress={() => navigation.navigate(ROUTES.ROADMAP)}>
          <Text style={styles.btnPrimaryText}>Continue Learning →</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.btnSecondary, pressed && styles.btnPressed]}
          onPress={() => navigation.navigate(ROUTES.ROADMAP)}>
          <Text style={styles.btnSecondaryText}>🗺️ Go to Roadmap</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const BUTTON_PADDING_VERTICAL = 18;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { flex: 1, padding: spacing.lg, gap: spacing.md },
  actions: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    paddingTop: spacing.sm,
    gap: spacing.sm,
    borderTopWidth: 2,
    borderTopColor: colors.border,
    backgroundColor: colors.bg,
  },
  btnPrimary: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    paddingVertical: BUTTON_PADDING_VERTICAL,
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
    paddingVertical: BUTTON_PADDING_VERTICAL,
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
  btnPrimaryText: { fontSize: 16, fontWeight: '900', color: colors.textInverse },
  btnSecondaryText: { fontSize: 16, fontWeight: '800', color: colors.text },
});
