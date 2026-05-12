import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useUserStore } from '../../../app/store/rootStore';
import { useRoadmap } from '../../roadmap/hooks/useRoadmap';
import { colors, spacing } from '../../../app/theme';
import type { AppStackParamList } from '../../../app/navigation/types';
import { ROUTES } from '../../../app/navigation/routes';

type Nav = NativeStackNavigationProp<AppStackParamList, typeof ROUTES.PROGRESS>;
type Route = RouteProp<AppStackParamList, typeof ROUTES.PROGRESS>;

const VIDEOS_PER_TOPIC = 3;

export function ProgressScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const {
    hobbyId, topicId, topicName, stageIndex,
    accumulatedVideos, videosWatched, xpEarned,
  } = route.params;

  const xp = useUserStore((s) => s.xp);
  const level = useUserStore((s) => s.level);
  const streak = useUserStore((s) => s.streak);
  const updateStreak = useUserStore((s) => s.updateStreak);
  const { roadmap } = useRoadmap(hobbyId);

  useEffect(() => { updateStreak(); }, [updateStreak]);

  const totalTopics = roadmap?.stages.length ?? 0;
  const totalVideos = totalTopics * VIDEOS_PER_TOPIC;
  const progressPct = totalVideos > 0
    ? Math.min(100, Math.round((accumulatedVideos / totalVideos) * 100))
    : 0;

  const topicProgressPct = Math.min(100, Math.round(
    ((stageIndex + 1) / Math.max(totalTopics, 1)) * 100
  ));

  function handleContinue() {
    navigation.replace(ROUTES.FEED, {
      hobbyId, topicId, topicName, stageIndex, accumulatedVideos,
    });
  }

  function handleDashboard() {
    navigation.navigate(ROUTES.DASHBOARD);
  }

  const isStreakAlive = streak > 0;

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}>

        {/* ── HERO BLOCK ─────────────────────────────────────────── */}
        <View style={styles.hero}>
          {/* Decorative dots */}
          <View style={[styles.heroDot, styles.heroDot1]} />
          <View style={[styles.heroDot, styles.heroDot2]} />
          <View style={[styles.heroDot, styles.heroDot3]} />

          {/* Stamp badge */}
          <View style={styles.stampOuter}>
            <View style={styles.stampInner}>
              <Text style={styles.stampText}>SESSION COMPLETE</Text>
            </View>
          </View>

          {/* XP number — the big one */}
          <View style={styles.xpBlock}>
            <Text style={styles.xpPlus}>+</Text>
            <Text style={styles.xpNumber}>{xpEarned}</Text>
            <View style={styles.xpTagBlock}>
              <Text style={styles.xpTag}>XP</Text>
            </View>
          </View>

          {/* Topic chip */}
          <View style={styles.topicChip}>
            <View style={styles.topicDot} />
            <Text style={styles.topicChipText} numberOfLines={1}>
              {topicName.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* ── STATS ROW ──────────────────────────────────────────── */}
        <View style={styles.statsRow}>
          <StatCard
            value={String(videosWatched)}
            label="VIDEOS"
            bg={colors.yellow}
            textColor={colors.text}
          />
          <StatCard
            value={isStreakAlive ? `${streak}` : '0'}
            label="STREAK"
            bg={isStreakAlive ? colors.coral : colors.bgElevated}
            textColor={isStreakAlive ? '#fff' : colors.textMuted}
            suffix={isStreakAlive ? '🔥' : ''}
          />
          <StatCard
            value={`${level}`}
            label="LEVEL"
            bg={colors.primary}
            textColor={colors.textInverse}
          />
        </View>

        {/* ── JOURNEY CARD ───────────────────────────────────────── */}
        <View style={styles.journeyCard}>
          <View style={styles.journeyHeader}>
            <Text style={styles.journeyTitle}>YOUR JOURNEY</Text>
            <Text style={styles.journeyXP}>{xp} XP TOTAL</Text>
          </View>

          {/* Topic progress */}
          <View style={styles.progressBlock}>
            <View style={styles.progressLabelRow}>
              <Text style={styles.progressLabel}>TOPICS</Text>
              <Text style={styles.progressValue}>
                {stageIndex + 1} / {totalTopics}
              </Text>
            </View>
            <View style={styles.barTrack}>
              <View style={[styles.barFill, { width: `${topicProgressPct}%` }]}>
                <View style={styles.barNub} />
              </View>
            </View>
          </View>

          {/* Videos progress */}
          <View style={styles.progressBlock}>
            <View style={styles.progressLabelRow}>
              <Text style={styles.progressLabel}>VIDEOS WATCHED</Text>
              <Text style={styles.progressValue}>
                {accumulatedVideos} / {totalVideos || '?'}
              </Text>
            </View>
            <View style={styles.barTrack}>
              <View style={[styles.barFillYellow, { width: `${progressPct}%` }]}>
                <View style={styles.barNubYellow} />
              </View>
            </View>
            {progressPct > 0 && (
              <Text style={styles.progressPct}>{progressPct}% of roadmap done</Text>
            )}
          </View>
        </View>

        {/* ── MOTIVATION LINE ────────────────────────────────────── */}
        <View style={styles.motRow}>
          <View style={styles.motLine} />
          <Text style={styles.motText}>KEEP THE STREAK ALIVE</Text>
          <View style={styles.motLine} />
        </View>

      </ScrollView>

      {/* ── ACTION BUTTONS ─────────────────────────────────────── */}
      <View style={styles.actions}>
        <Pressable
          style={({ pressed }) => [styles.btnPrimary, pressed && styles.btnPrimaryPressed]}
          onPress={handleContinue}>
          <Text style={styles.btnPrimaryText}>KEEP GOING →</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.btnSecondary, pressed && styles.btnSecondaryPressed]}
          onPress={handleDashboard}>
          <Text style={styles.btnSecondaryText}>DASHBOARD</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

/* ── Tiny local StatCard ────────────────────────────────────────── */
function StatCard({
  value, label, bg, textColor, suffix = '',
}: {
  value: string; label: string; bg: string; textColor: string; suffix?: string;
}) {
  return (
    <View style={[statStyles.card, { backgroundColor: bg }]}>
      <Text style={[statStyles.value, { color: textColor }]}>{value}{suffix}</Text>
      <Text style={[statStyles.label, { color: textColor, opacity: 0.6 }]}>{label}</Text>
    </View>
  );
}

const statStyles = StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: 2.5,
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: spacing.md,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 3,
    gap: 2,
  },
  value: { fontSize: 24, fontWeight: '900', letterSpacing: -0.5 },
  label: { fontSize: 8, fontWeight: '900', letterSpacing: 1.5 },
});

/* ── Main styles ────────────────────────────────────────────────── */
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: { flex: 1 },
  scrollContent: { gap: spacing.md, paddingBottom: spacing.lg },

  /* Hero */
  hero: {
    backgroundColor: colors.primary,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    gap: spacing.md,
    borderBottomWidth: 3,
    borderBottomColor: colors.border,
    overflow: 'hidden',
    position: 'relative',
  },
  heroDot: {
    position: 'absolute',
    borderRadius: 99,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  heroDot1: { width: 120, height: 120, top: -40, right: -30 },
  heroDot2: { width: 80, height: 80, bottom: -20, left: -20 },
  heroDot3: { width: 50, height: 50, top: 20, left: 30 },

  stampOuter: {
    borderWidth: 3,
    borderColor: colors.yellow,
    borderRadius: 6,
    padding: 2,
    transform: [{ rotate: '-2deg' }],
  },
  stampInner: {
    backgroundColor: colors.yellow,
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
    borderRadius: 3,
  },
  stampText: { fontSize: 11, fontWeight: '900', color: colors.text, letterSpacing: 3 },

  xpBlock: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
  },
  xpPlus: { fontSize: 28, fontWeight: '900', color: colors.yellow, marginBottom: 8 },
  xpNumber: { fontSize: 80, fontWeight: '900', color: '#fff', letterSpacing: -4, lineHeight: 88 },
  xpTagBlock: {
    backgroundColor: colors.yellow,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 10,
  },
  xpTag: { fontSize: 16, fontWeight: '900', color: colors.text },

  topicChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  topicDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.yellow },
  topicChipText: { fontSize: 11, fontWeight: '800', color: '#fff', letterSpacing: 1 },

  /* Stats */
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
  },

  /* Journey card */
  journeyCard: {
    marginHorizontal: spacing.lg,
    borderWidth: 2.5,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.bgElevated,
    padding: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 4,
    gap: spacing.md,
  },
  journeyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
    paddingBottom: spacing.sm,
  },
  journeyTitle: { fontSize: 13, fontWeight: '900', color: colors.text, letterSpacing: 1.5 },
  journeyXP: { fontSize: 10, fontWeight: '800', color: colors.textMuted, letterSpacing: 1 },

  progressBlock: { gap: 6 },
  progressLabelRow: { flexDirection: 'row', justifyContent: 'space-between' },
  progressLabel: { fontSize: 10, fontWeight: '800', color: colors.textMuted, letterSpacing: 1 },
  progressValue: { fontSize: 10, fontWeight: '900', color: colors.text },

  barTrack: {
    height: 14,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    minWidth: 4,
  },
  barNub: {
    width: 4,
    height: '60%',
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 2,
    marginRight: 2,
  },
  barFillYellow: {
    height: '100%',
    backgroundColor: colors.yellow,
    borderRadius: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    minWidth: 4,
  },
  barNubYellow: {
    width: 4,
    height: '60%',
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 2,
    marginRight: 2,
  },
  progressPct: { fontSize: 9, fontWeight: '700', color: colors.textDim, letterSpacing: 0.5 },

  /* Motivation */
  motRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
  },
  motLine: { flex: 1, height: 1.5, backgroundColor: colors.borderLight },
  motText: { fontSize: 9, fontWeight: '900', color: colors.textDim, letterSpacing: 2 },

  /* Buttons */
  actions: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    paddingTop: spacing.sm,
    gap: spacing.sm,
    borderTopWidth: 2.5,
    borderTopColor: colors.border,
    backgroundColor: colors.bg,
  },
  btnPrimary: {
    borderWidth: 2.5,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.primary,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 4,
  },
  btnPrimaryPressed: {
    transform: [{ translateX: 4 }, { translateY: 4 }],
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
  btnPrimaryText: { fontSize: 16, fontWeight: '900', color: '#fff', letterSpacing: 2 },
  btnSecondary: {
    borderWidth: 2.5,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.bgElevated,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 4,
  },
  btnSecondaryPressed: {
    transform: [{ translateX: 4 }, { translateY: 4 }],
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
  btnSecondaryText: { fontSize: 14, fontWeight: '900', color: colors.text, letterSpacing: 1.5 },
});
