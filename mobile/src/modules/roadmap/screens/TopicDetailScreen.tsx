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

const SECTION_ACCENTS = ['#DAF0EE', '#FFF9C4', '#F3E5F5', '#E8F5E9', '#FFF3E0'];

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
          <View style={styles.loadingCard}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingTitle}>GENERATING CONTENT</Text>
            <Text style={styles.loadingText}>AI is building your deep dive…</Text>
          </View>
        </View>
      )}

      {error !== null && (
        <View style={styles.center}>
          <View style={styles.errorCard}>
            <Text style={styles.errorEmoji}>⚠️</Text>
            <Text style={styles.errorText}>{error}</Text>
            <Pressable
              style={({ pressed }) => [styles.retryBtn, pressed && styles.retryBtnPressed]}
              onPress={handleRetry}>
              <Text style={styles.retryText}>TRY AGAIN</Text>
            </Pressable>
          </View>
        </View>
      )}

      {detail !== null && (
        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

          {/* Topic hero */}
          <View style={styles.heroCard}>
            <View style={styles.heroDec} />
            <View style={styles.heroDecSmall} />
            <View style={styles.heroTopRow}>
              <View style={styles.heroIconWrap}>
                <Text style={styles.heroIcon}>📖</Text>
              </View>
              <View>
                <Text style={styles.heroLabel}>DEEP DIVE</Text>
                <Text style={styles.heroTopic} numberOfLines={2}>{params.topicName.toUpperCase()}</Text>
              </View>
            </View>
            <Text style={styles.overviewText}>{detail.overview}</Text>
          </View>

          {/* Sections */}
          {detail.sections.map((section, i) => (
            <View key={i} style={[styles.sectionCard, { backgroundColor: SECTION_ACCENTS[i % SECTION_ACCENTS.length] }]}>
              <View style={styles.sectionNumWrap}>
                <Text style={styles.sectionNum}>{String(i + 1).padStart(2, '0')}</Text>
              </View>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionContent}>{section.content}</Text>
            </View>
          ))}

          {/* Key Takeaways */}
          <View style={styles.takeawaysCard}>
            <View style={styles.takeawaysHeader}>
              <View style={styles.takeawaysIconWrap}>
                <Text style={styles.takeawaysIcon}>⚡</Text>
              </View>
              <Text style={styles.takeawaysLabel}>KEY TAKEAWAYS</Text>
            </View>
            {detail.keyTakeaways.map((t, i) => (
              <View key={i} style={styles.takeawayRow}>
                <View style={styles.takeawayNum}>
                  <Text style={styles.takeawayNumText}>{i + 1}</Text>
                </View>
                <Text style={styles.takeawayText}>{t}</Text>
              </View>
            ))}
          </View>

          {/* Practice challenge */}
          <View style={styles.practiceCard}>
            <View style={styles.practiceDec} />
            <View style={styles.practiceHeader}>
              <Text style={styles.practiceIcon}>🎯</Text>
              <Text style={styles.practiceLabel}>PRACTICE CHALLENGE</Text>
            </View>
            <Text style={styles.practiceText}>{detail.practicePrompt}</Text>
          </View>

          <View style={{ height: spacing.xxl }} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },

  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  loadingCard: {
    backgroundColor: colors.bgElevated,
    borderWidth: 3,
    borderColor: colors.border,
    borderRadius: radius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.md,
    width: '100%',
    shadowColor: colors.shadow,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 5,
  },
  loadingTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: 2,
  },
  loadingText: { fontSize: 12, fontWeight: '600', color: colors.textMuted },
  errorCard: {
    backgroundColor: '#FFF3F3',
    borderWidth: 3,
    borderColor: colors.danger,
    borderRadius: radius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.md,
    width: '100%',
  },
  errorEmoji: { fontSize: 32 },
  errorText: { fontSize: 13, fontWeight: '700', color: colors.danger, textAlign: 'center' },
  retryBtn: {
    backgroundColor: colors.primary,
    borderWidth: 2.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    shadowColor: colors.shadow,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 3,
  },
  retryBtnPressed: {
    transform: [{ translateX: 3 }, { translateY: 3 }],
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
  retryText: { fontSize: 12, fontWeight: '900', color: colors.textInverse, letterSpacing: 1 },

  scroll: { flex: 1 },
  scrollContent: { padding: spacing.lg, gap: spacing.md },

  // Hero card
  heroCard: {
    backgroundColor: colors.primary,
    borderWidth: 3,
    borderColor: colors.border,
    borderRadius: radius.xl,
    padding: spacing.lg,
    gap: spacing.md,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: colors.shadow,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 5,
  },
  heroDec: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.06)',
    top: -40,
    right: -30,
  },
  heroDecSmall: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: 'rgba(255,214,0,0.1)',
    bottom: -10,
    left: 40,
    transform: [{ rotate: '18deg' }],
  },
  heroTopRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, zIndex: 1 },
  heroIconWrap: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.yellow,
    borderWidth: 2.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroIcon: { fontSize: 22 },
  heroLabel: { fontSize: 8, fontWeight: '900', color: 'rgba(255,255,255,0.45)', letterSpacing: 2, zIndex: 1 },
  heroTopic: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.textInverse,
    letterSpacing: -0.3,
    lineHeight: 20,
    zIndex: 1,
    maxWidth: 220,
  },
  overviewText: { fontSize: 14, fontWeight: '500', color: 'rgba(255,255,255,0.85)', lineHeight: 21, zIndex: 1 },

  // Section cards
  sectionCard: {
    borderWidth: 2.5,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.sm,
    shadowColor: colors.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 4,
  },
  sectionNumWrap: {
    alignSelf: 'flex-start',
    backgroundColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  sectionNum: { fontSize: 9, fontWeight: '900', color: colors.bgElevated, letterSpacing: 1 },
  sectionTitle: { fontSize: 15, fontWeight: '900', color: colors.text, letterSpacing: -0.2 },
  sectionContent: { fontSize: 14, fontWeight: '500', color: colors.textMuted, lineHeight: 21 },

  // Takeaways
  takeawaysCard: {
    backgroundColor: colors.yellow,
    borderWidth: 3,
    borderColor: colors.border,
    borderRadius: radius.xl,
    padding: spacing.lg,
    gap: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 5,
  },
  takeawaysHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  takeawaysIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  takeawaysIcon: { fontSize: 14 },
  takeawaysLabel: { fontSize: 11, fontWeight: '900', color: colors.text, letterSpacing: 2 },
  takeawayRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm },
  takeawayNum: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
    flexShrink: 0,
  },
  takeawayNumText: { fontSize: 9, fontWeight: '900', color: colors.bgElevated },
  takeawayText: { flex: 1, fontSize: 13, fontWeight: '600', color: colors.text, lineHeight: 20 },

  // Practice card
  practiceCard: {
    backgroundColor: colors.bgElevated,
    borderWidth: 3,
    borderColor: colors.border,
    borderRadius: radius.xl,
    padding: spacing.lg,
    gap: spacing.sm,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: colors.shadow,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 5,
  },
  practiceDec: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: colors.primaryLight,
    top: -20,
    right: -20,
    transform: [{ rotate: '14deg' }],
  },
  practiceHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, zIndex: 1 },
  practiceIcon: { fontSize: 18, zIndex: 1 },
  practiceLabel: { fontSize: 10, fontWeight: '900', color: colors.primary, letterSpacing: 2, zIndex: 1 },
  practiceText: { fontSize: 14, fontWeight: '600', color: colors.text, lineHeight: 21, zIndex: 1 },
});
