import React, { useEffect } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { ScreenHeader } from '../../../shared/components/ui/ScreenHeader/ScreenHeader';
import { colors, spacing, radius } from '../../../app/theme';
import { ROUTES } from '../../../app/navigation/routes';
import type { AppStackParamList } from '../../../app/navigation/types';
import { useTopicDetail } from '../hooks/useTopicDetail';

type Nav   = NativeStackNavigationProp<AppStackParamList, typeof ROUTES.TOPIC_DETAIL>;
type Route = RouteProp<AppStackParamList, typeof ROUTES.TOPIC_DETAIL>;

export function TopicDetailScreen() {
  const navigation = useNavigation<Nav>();
  const { params } = useRoute<Route>();
  const { detail, isLoading, error, fetch } = useTopicDetail();

  useEffect(() => {
    void fetch({ hobbyId: params.hobbyId, topicId: params.topicId, topicName: params.topicName, hobbyName: params.hobbyName });
  }, [fetch, params.hobbyId, params.topicId, params.topicName, params.hobbyName]);

  const handleRetry = () => void fetch({ hobbyId: params.hobbyId, topicId: params.topicId, topicName: params.topicName, hobbyName: params.hobbyName });

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScreenHeader title={params.topicName} onBack={() => navigation.goBack()} />

      {isLoading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Generating detailed content…</Text>
        </View>
      )}

      {error !== null && (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable style={styles.retryBtn} onPress={handleRetry}>
            <Text style={styles.retryText}>Retry</Text>
          </Pressable>
        </View>
      )}

      {detail !== null && (
        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.overviewCard}>
            <Text style={styles.cardLabel}>OVERVIEW</Text>
            <Text style={styles.overviewText}>{detail.overview}</Text>
          </View>

          {detail.sections.map((section, i) => (
            <View key={i} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionContent}>{section.content}</Text>
            </View>
          ))}

          <View style={styles.takeawaysCard}>
            <Text style={styles.cardLabel}>KEY TAKEAWAYS</Text>
            {detail.keyTakeaways.map((t, i) => (
              <View key={i} style={styles.takeawayRow}>
                <View style={styles.bullet} />
                <Text style={styles.takeawayText}>{t}</Text>
              </View>
            ))}
          </View>

          <View style={styles.practiceCard}>
            <Text style={styles.practiceLabel}>PRACTICE CHALLENGE</Text>
            <Text style={styles.practiceText}>{detail.practicePrompt}</Text>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md },
  loadingText: { fontSize: 14, fontWeight: '600', color: colors.textMuted },
  errorText: { fontSize: 14, fontWeight: '600', color: colors.danger, textAlign: 'center' },
  retryBtn: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.bgElevated,
  },
  retryText: { fontWeight: '800', color: colors.text },
  scroll: { flex: 1 },
  scrollContent: { padding: spacing.lg },
  overviewCard: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.primaryLight,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 4,
  },
  cardLabel: { fontSize: 10, fontWeight: '800', color: colors.primary, letterSpacing: 1.5, marginBottom: spacing.sm },
  overviewText: { fontSize: 15, fontWeight: '500', color: colors.text, lineHeight: 22 },
  section: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.bgElevated,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 3,
  },
  sectionTitle: { fontSize: 14, fontWeight: '900', color: colors.text, marginBottom: spacing.sm },
  sectionContent: { fontSize: 14, fontWeight: '500', color: colors.textMuted, lineHeight: 21 },
  takeawaysCard: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.yellow,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 4,
  },
  takeawayRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm, marginBottom: spacing.sm },
  bullet: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.border, marginTop: 5, flexShrink: 0 },
  takeawayText: { flex: 1, fontSize: 13, fontWeight: '600', color: colors.text, lineHeight: 19 },
  practiceCard: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 4,
  },
  practiceLabel: { fontSize: 10, fontWeight: '800', color: colors.yellow, letterSpacing: 1.5, marginBottom: spacing.sm },
  practiceText: { fontSize: 14, fontWeight: '600', color: colors.textInverse, lineHeight: 21 },
});
