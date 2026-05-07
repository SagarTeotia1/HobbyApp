import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { AIChatInterface } from '../../../shared/components/ai/AIChatInterface/AIChatInterface';
import { UserHeroCard } from '../components/UserHeroCard/UserHeroCard';
import { ContinueLearningCard } from '../components/ContinueLearningCard/ContinueLearningCard';
import { LearningJourneyCard } from '../components/LearningJourneyCard/LearningJourneyCard';
import { GamesSection } from '../components/GamesSection/GamesSection';
import { FlashcardPreviewCard } from '../components/FlashcardPreviewCard/FlashcardPreviewCard';
import { useDashboard } from '../hooks/useDashboard';
import { useUserStore } from '../../../app/store/rootStore';
import { useLearningFeedStore } from '../../learning-feed/store/learningFeed.store';
import { colors, spacing } from '../../../app/theme';
import type { MainTabParamList } from '../../../app/navigation/types';
import type { AnonymousUser } from '../../../shared/types/user.types';
import type { DifficultyLevel } from '../../../shared/types/card.types';
import { ROUTES } from '../../../app/navigation/routes';

export function DashboardScreen() {
  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();

  const uuid = useUserStore((s) => s.uuid);
  const hobbyId = useUserStore((s) => s.currentHobbyId);
  const xp = useUserStore((s) => s.xp);
  const level = useUserStore((s) => s.level);
  const streak = useUserStore((s) => s.streak);
  const nextCard = useLearningFeedStore((s) => s.cards[0] ?? null);

  const { data } = useDashboard(hobbyId);

  const hobbyName = data?.hobbyName ?? hobbyId ?? 'Your Hobby';
  const roadmapStages = data?.roadmapStages ?? [];

  const heroUser: AnonymousUser = {
    uuid: uuid ?? '',
    currentHobbyId: hobbyId ?? '',
    xp,
    level,
    streak,
    lastActiveDateISO: '',
    preferences: {
      dailyMinutes: 10,
      skillLevel: (data?.currentDifficulty ?? 'beginner') as DifficultyLevel,
    },
    createdAt: '',
  };

  const handleContinueLearning = () => {
    navigation.navigate(ROUTES.TAB_FEED, { screen: ROUTES.FEED_LEARNING });
  };

  const handleSpeedRound = () => {
    navigation.navigate(ROUTES.TAB_FEED, { screen: ROUTES.FEED_SPEED_ROUND });
  };

  const handleBossRound = () => {
    navigation.navigate(ROUTES.TAB_FEED, { screen: ROUTES.FEED_BOSS_ROUND });
  };

  const nextCardTitle = nextCard?.title ?? 'Start Learning';
  const conceptLabel = nextCard?.conceptId.replace(/_/g, ' ') ?? hobbyName;

  const aiSuggestions = [
    'What should I learn next?',
    `Tips for ${hobbyName}`,
    'Explain this concept',
  ];

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        <UserHeroCard user={heroUser} hobbyName={hobbyName} />

        <ContinueLearningCard
          nextCardTitle={nextCardTitle}
          onPress={handleContinueLearning}
        />

        {roadmapStages.length > 0 && (
          <LearningJourneyCard stages={roadmapStages} />
        )}

        <GamesSection
          onSpeedRound={handleSpeedRound}
          onBossRound={handleBossRound}
        />

        {nextCard ? (
          <FlashcardPreviewCard
            title={nextCard.title}
            conceptLabel={conceptLabel}
            onPress={handleContinueLearning}
          />
        ) : null}

        <View style={styles.chatWrapper}>
          <AIChatInterface
            hobbyId={hobbyId ?? 'general'}
            collapsed
            suggestions={aiSuggestions}
            placeholder={`Ask about ${hobbyName}...`}
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
  chatWrapper: {
    marginTop: spacing.sm,
  },
});
