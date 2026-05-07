import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Typography } from '../../../shared/components/ui/Typography/Typography';
import { Button } from '../../../shared/components/ui/Button/Button';
import { FullScreenLoader } from '../../../shared/components/loaders/FullScreenLoader';
import { SessionSummaryCard } from '../components/SessionSummaryCard/SessionSummaryCard';
import { XPSummaryCard } from '../components/XPSummaryCard/XPSummaryCard';
import { StreakCard } from '../components/StreakCard/StreakCard';
import { WeakTopicsCard } from '../components/WeakTopicsCard/WeakTopicsCard';
import { useProgressSession } from '../hooks/useProgress';
import { useUserStore } from '../../../app/store/rootStore';
import { useLearningFeedStore } from '../../learning-feed/store/learningFeed.store';
import { useBossRoundStore } from '../../boss-round/store/bossRound.store';
import { useSpeedRoundStore } from '../../speed-round/store/speedRound.store';
import { GAME_CONFIG } from '../../../shared/constants/gameConfig';
import { colors, spacing } from '../../../app/theme';
import type { FeedStackParamList } from '../../../app/navigation/types';
import type { MainTabParamList } from '../../../app/navigation/types';
import { ROUTES } from '../../../app/navigation/routes';

export function ProgressScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<FeedStackParamList>>();

  const sessionId = useLearningFeedStore((s) => s.sessionId);
  const xp = useUserStore((s) => s.xp);
  const level = useUserStore((s) => s.level);
  const streak = useUserStore((s) => s.streak);

  const bossXPGained = useBossRoundStore((s) => s.xpGained);
  const bossXPLost = useBossRoundStore((s) => s.xpLost);
  const speedCorrect = useSpeedRoundStore((s) => s.correctCount);

  const roundXP =
    bossXPGained - bossXPLost +
    speedCorrect * GAME_CONFIG.SPEED_ROUND.XP_PER_CORRECT;

  const { data: sessionData, isLoading } = useProgressSession(sessionId);

  const progressToNextLevel =
    (xp % GAME_CONFIG.LEVELS.XP_PER_LEVEL) / GAME_CONFIG.LEVELS.XP_PER_LEVEL;

  const cardsSeen = sessionData?.cardsSeen ?? 0;
  const cardsUnderstood = sessionData?.cardsUnderstood ?? 0;
  const cardsBookmarked = sessionData?.cardsBookmarked ?? 0;
  const weakTopics = sessionData?.weakTopics ?? [];
  const sessionXP = (sessionData?.xpGained ?? 0) + Math.max(0, roundXP);

  const handleContinue = () => {
    navigation.navigate(ROUTES.FEED_LEARNING);
  };

  const handleDashboard = () => {
    navigation
      .getParent<BottomTabNavigationProp<MainTabParamList>>()
      ?.navigate(ROUTES.TAB_DASHBOARD);
  };

  if (isLoading && !!sessionId) {
    return <FullScreenLoader />;
  }

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        <Typography variant="title" weight="bold" style={styles.heading}>
          Session Complete 🎉
        </Typography>

        <SessionSummaryCard
          cardsSeen={cardsSeen}
          understood={cardsUnderstood}
          bookmarked={cardsBookmarked}
        />

        <XPSummaryCard
          sessionXP={sessionXP}
          totalXP={xp}
          level={level}
          progressToNextLevel={progressToNextLevel}
        />

        <StreakCard streak={streak} />

        <WeakTopicsCard topics={weakTopics} />

        <View style={styles.actions}>
          <Button
            label="Continue Learning"
            variant="primary"
            onPress={handleContinue}
          />
          <Button
            label="Go to Dashboard"
            variant="secondary"
            onPress={handleDashboard}
          />
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
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xxxl,
  },
  heading: {
    marginBottom: spacing.sm,
  },
  actions: {
    gap: spacing.sm,
    marginTop: spacing.md,
  },
});
