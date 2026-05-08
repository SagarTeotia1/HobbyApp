import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useUserStore } from '../../../app/store/rootStore';
import { useRoadmapStore } from '../store/roadmap.store';
import { RoadmapNode } from '../components/RoadmapNode/RoadmapNode';
import { TopicActionSheet } from '../components/TopicActionSheet';
import { ChangeHobbySheet } from '../components/ChangeHobbySheet';
import { FloatingAIButton } from '../../../shared/components/ai/FloatingAIButton/FloatingAIButton';
import { getHobbyById, getTotalTopics } from '../../../shared/constants/curriculum';
import { colors, spacing, radius } from '../../../app/theme';
import { ROUTES } from '../../../app/navigation/routes';
import type { AppStackParamList } from '../../../app/navigation/types';

type Nav = NativeStackNavigationProp<AppStackParamList, typeof ROUTES.ROADMAP>;

export function RoadmapScreen() {
  const navigation = useNavigation<Nav>();
  const hobbyId = useUserStore((s) => s.currentHobbyId) ?? 'chess';
  const xp = useUserStore((s) => s.xp);
  const level = useUserStore((s) => s.level);
  const setHobby = useUserStore((s) => s.setHobby);

  const getTopicProgress = useRoadmapStore((s) => s.getTopicProgress);
  const getCompletedCount = useRoadmapStore((s) => s.getCompletedTopicCount);

  const hobby = getHobbyById(hobbyId);
  const topics = hobby?.topics ?? [];
  const completedCount = getCompletedCount(hobbyId);
  const totalCount = getTotalTopics(hobbyId);

  const [pickerOpen, setPickerOpen] = useState(false);
  const [actionSheet, setActionSheet] = useState<{ topicId: string; topicName: string } | null>(null);

  const handleTopicPress = useCallback(
    (topicId: string, topicName: string) => {
      navigation.navigate(ROUTES.FEED, { hobbyId, topicId, topicName });
    },
    [navigation, hobbyId],
  );

  const handleTopicLongPress = useCallback(
    (topicId: string, topicName: string) => {
      setActionSheet({ topicId, topicName });
    },
    [],
  );

  const handleGoDetail = useCallback(() => {
    if (!actionSheet) return;
    setActionSheet(null);
    navigation.navigate(ROUTES.TOPIC_DETAIL, {
      hobbyId:   hobbyId,
      topicId:   actionSheet.topicId,
      topicName: actionSheet.topicName,
      hobbyName: hobby?.name ?? hobbyId,
    });
  }, [navigation, hobbyId, hobby, actionSheet]);

  const handleGoGraph = useCallback(() => {
    if (!actionSheet) return;
    setActionSheet(null);
    navigation.navigate(ROUTES.LEARN_GRAPH, {
      hobbyId:   hobbyId,
      topicId:   actionSheet.topicId,
      topicName: actionSheet.topicName,
      hobbyName: hobby?.name ?? hobbyId,
    });
  }, [navigation, hobbyId, hobby, actionSheet]);

  const handleDashboard = useCallback(() => {
    navigation.navigate(ROUTES.DASHBOARD);
  }, [navigation]);

  const handleChangeHobby = useCallback(
    (newHobbyId: string) => {
      setHobby(newHobbyId);
      setPickerOpen(false);
    },
    [setHobby],
  );

  const isTopicLocked = (index: number): boolean => {
    if (index === 0) return false;
    const prevTopic = topics[index - 1];
    if (!prevTopic) return true;
    const prev = getTopicProgress(hobbyId, prevTopic.id);
    return !prev?.completed;
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.hobbyEmoji}>{hobby?.emoji ?? '🎯'}</Text>
          <View>
            <Text style={styles.hobbyName}>{hobby?.name ?? hobbyId}</Text>
            <Pressable onPress={() => setPickerOpen(true)} hitSlop={8}>
              <Text style={styles.changeHobbyLink}>Change hobby ›</Text>
            </Pressable>
          </View>
        </View>
        <Pressable
          style={({ pressed }) => [styles.dashBtn, pressed && styles.dashBtnPressed]}
          onPress={handleDashboard}>
          <Text style={styles.dashBtnText}>Stats</Text>
        </Pressable>
      </View>

      {/* XP strip */}
      <View style={styles.xpStrip}>
        <View style={styles.xpItem}>
          <Text style={styles.xpValue}>{xp}</Text>
          <Text style={styles.xpLabel}>XP</Text>
        </View>
        <View style={styles.xpDivider} />
        <View style={styles.xpItem}>
          <Text style={styles.xpValue}>Lv {level}</Text>
          <Text style={styles.xpLabel}>LEVEL</Text>
        </View>
        <View style={styles.xpDivider} />
        <View style={styles.xpItem}>
          <Text style={styles.xpValue}>{completedCount}/{totalCount}</Text>
          <Text style={styles.xpLabel}>TOPICS</Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={styles.progressBarOuter}>
        <View
          style={[
            styles.progressBarInner,
            { width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` },
          ]}
        />
      </View>

      {/* Roadmap */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Your Learning Roadmap</Text>
        {topics.map((topic, index) => {
          const locked = isTopicLocked(index);
          const progress = getTopicProgress(hobbyId, topic.id);
          return (
            <RoadmapNode
              key={topic.id}
              topicName={topic.name}
              topicIndex={index}
              progress={progress}
              isFirst={index === 0}
              isLast={index === topics.length - 1}
              isLocked={locked}
              onPress={() => handleTopicPress(topic.id, topic.name)}
              onLongPress={() => handleTopicLongPress(topic.id, topic.name)}
            />
          );
        })}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      <FloatingAIButton hobbyId={hobbyId} context="roadmap" />

      {/* Topic action sheet */}
      <TopicActionSheet
        visible={actionSheet !== null}
        topicName={actionSheet?.topicName ?? ''}
        onDetail={handleGoDetail}
        onGraph={handleGoGraph}
        onClose={() => setActionSheet(null)}
      />

      {/* Hobby picker — onboarding style */}
      <ChangeHobbySheet
        visible={pickerOpen}
        currentHobbyId={hobbyId}
        onSelect={handleChangeHobby}
        onClose={() => setPickerOpen(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  hobbyEmoji: { fontSize: 32 },
  hobbyName: { fontSize: 20, fontWeight: '900', color: colors.text, letterSpacing: -0.5 },
  changeHobbyLink: { fontSize: 12, fontWeight: '700', color: colors.primary, marginTop: 2 },
  dashBtn: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.bgElevated,
    shadowColor: colors.shadow,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 3,
  },
  dashBtnPressed: {
    transform: [{ translateX: 3 }, { translateY: 3 }],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  dashBtnText: { fontWeight: '800', fontSize: 13, color: colors.text },
  xpStrip: {
    flexDirection: 'row',
    marginHorizontal: spacing.lg,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.bgElevated,
    shadowColor: colors.shadow,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 3,
    overflow: 'hidden',
  },
  xpItem: { flex: 1, alignItems: 'center', paddingVertical: spacing.sm },
  xpValue: { fontSize: 16, fontWeight: '900', color: colors.text },
  xpLabel: { fontSize: 10, fontWeight: '700', color: colors.textMuted, letterSpacing: 1 },
  xpDivider: { width: 2, backgroundColor: colors.border },
  progressBarOuter: {
    height: 6,
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    marginTop: spacing.sm,
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  progressBarInner: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: spacing.lg, paddingTop: spacing.xl },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
  },
  bottomSpacer: { height: 120 },

});
