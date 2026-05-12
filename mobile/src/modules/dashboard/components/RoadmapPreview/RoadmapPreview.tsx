import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';
import type { RoadmapStage, TopicProgress } from '../../../roadmap/types/roadmap.types';

interface Props {
  stages: RoadmapStage[];
  hobbyId: string;
  getTopicProgress: (hobbyId: string, topicId: string) => TopicProgress | undefined;
  onViewFull: () => void;
  onTopicPress: (stage: RoadmapStage, index: number) => void;
}

const VISIBLE = 5;

export function RoadmapPreview({ stages, hobbyId, getTopicProgress, onViewFull, onTopicPress }: Props) {
  if (stages.length === 0) return null;

  const currentIndex = stages.findIndex(
    (s) => !getTopicProgress(hobbyId, s.conceptId)?.completed,
  );
  const activeIdx = currentIndex === -1 ? stages.length - 1 : currentIndex;

  // Center window around active topic
  const half = Math.floor(VISIBLE / 2);
  let start = Math.max(0, activeIdx - half);
  const end = Math.min(stages.length, start + VISIBLE);
  start = Math.max(0, end - VISIBLE);
  const slice = stages.slice(start, end);

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>LEARNING PATH</Text>
          <Text style={styles.sub}>
            {currentIndex === -1
              ? `${stages.length}/${stages.length} complete 🏆`
              : `Stage ${activeIdx + 1} of ${stages.length}`}
          </Text>
        </View>
        <Pressable
          style={({ pressed }) => [styles.viewBtn, pressed && styles.viewBtnPressed]}
          onPress={onViewFull}>
          <Text style={styles.viewBtnText}>VIEW ALL →</Text>
        </Pressable>
      </View>

      {/* Track */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.trackScroll}
        contentContainerStyle={styles.trackContent} pointerEvents="box-none">

        {start > 0 && (
          <View style={styles.ellipsis}>
            <Text style={styles.ellipsisText}>···</Text>
          </View>
        )}

        {slice.map((stage, i) => {
          const absIdx = start + i;
          const progress = getTopicProgress(hobbyId, stage.conceptId);
          const isCompleted = progress?.completed === true;
          const isCurrent = absIdx === activeIdx;
          const isLocked = absIdx > activeIdx;
          const pct = isCompleted ? 100 : isCurrent && progress
            ? Math.round((progress.videosWatched / (progress.totalVideos || 1)) * 100)
            : 0;

          return (
            <React.Fragment key={stage.conceptId}>
              <Pressable
                style={({ pressed }) => [
                  styles.node,
                  isCompleted && styles.nodeCompleted,
                  isCurrent  && styles.nodeCurrent,
                  isLocked   && styles.nodeLocked,
                  pressed    && styles.nodePressed,
                ]}
                onPress={() => onTopicPress(stage, absIdx)}
                disabled={isLocked}>

                {/* Node icon */}
                <View style={[
                  styles.nodeIcon,
                  isCompleted && styles.nodeIconCompleted,
                  isCurrent  && styles.nodeIconCurrent,
                ]}>
                  <Text style={styles.nodeIconText}>
                    {isCompleted ? '✓' : isCurrent ? '▶' : `${absIdx + 1}`}
                  </Text>
                </View>

                {/* Label */}
                <Text style={[styles.nodeLabel, isLocked && styles.nodeLabelLocked]}
                  numberOfLines={2}>
                  {stage.title}
                </Text>

                {/* Progress bar for current */}
                {isCurrent && (
                  <View style={styles.nodeBar}>
                    <View style={[styles.nodeBarFill, { width: `${Math.max(pct, 4)}%` as `${number}%` }]} />
                  </View>
                )}

                {/* XP chip for completed */}
                {isCompleted && (
                  <View style={styles.doneChip}>
                    <Text style={styles.doneChipText}>DONE</Text>
                  </View>
                )}

                {/* Current badge */}
                {isCurrent && (
                  <View style={styles.nowChip}>
                    <Text style={styles.nowChipText}>NOW</Text>
                  </View>
                )}
              </Pressable>

              {/* Connector line */}
              {i < slice.length - 1 && (
                <View style={[
                  styles.connector,
                  (isCompleted) && styles.connectorDone,
                ]} />
              )}
            </React.Fragment>
          );
        })}

        {end < stages.length && (
          <View style={styles.ellipsis}>
            <Text style={styles.ellipsisText}>···</Text>
          </View>
        )}
      </ScrollView>

      {/* Overall progress bar */}
      <View style={styles.footer}>
        <View style={styles.footerBar}>
          <View style={[
            styles.footerBarFill,
            { width: `${Math.round((Math.max(0, activeIdx) / stages.length) * 100)}%` as `${number}%` },
          ]} />
        </View>
        <Text style={styles.footerLabel}>
          {Math.round((Math.max(0, currentIndex === -1 ? stages.length : activeIdx) / stages.length) * 100)}% complete
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bgElevated,
    borderWidth: 3,
    borderColor: colors.border,
    borderRadius: radius.xl,
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOffset: { width: 6, height: 6 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 6,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 2,
    borderBottomColor: colors.borderLight,
  },
  headerLeft: { gap: 2 },
  title: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: 2,
  },
  sub: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textMuted,
  },
  viewBtn: {
    backgroundColor: colors.yellow,
    borderWidth: 2.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
  },
  viewBtnPressed: {
    transform: [{ translateX: 2 }, { translateY: 2 }],
  },
  viewBtnText: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: 1,
  },

  // Track
  trackScroll: { paddingVertical: spacing.md },
  trackContent: {
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    paddingBottom: spacing.sm,
  },

  node: {
    width: 88,
    backgroundColor: colors.surface,
    borderWidth: 2.5,
    borderColor: colors.borderLight,
    borderRadius: radius.lg,
    padding: spacing.sm,
    alignItems: 'center',
    gap: spacing.xxs,
  },
  nodeCompleted: {
    backgroundColor: '#CFE1B9',
    borderColor: colors.border,
  },
  nodeCurrent: {
    backgroundColor: colors.yellow,
    borderColor: colors.border,
    borderWidth: 3,
  },
  nodeLocked: {
    backgroundColor: colors.surface,
    opacity: 0.5,
  },
  nodePressed: {
    transform: [{ scale: 0.96 }],
  },

  nodeIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.borderLight,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeIconCompleted: {
    backgroundColor: '#4CAF50',
    borderColor: '#2E7D32',
  },
  nodeIconCurrent: {
    backgroundColor: colors.primary,
    borderColor: colors.border,
  },
  nodeIconText: {
    fontSize: 11,
    fontWeight: '900',
    color: colors.bgElevated,
  },

  nodeLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    letterSpacing: 0.3,
    lineHeight: 12,
  },
  nodeLabelLocked: {
    color: colors.textMuted,
  },

  nodeBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 2,
  },
  nodeBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },

  doneChip: {
    backgroundColor: '#4CAF50',
    borderRadius: radius.pill,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  doneChipText: {
    fontSize: 7,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 0.5,
  },
  nowChip: {
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  nowChipText: {
    fontSize: 7,
    fontWeight: '900',
    color: colors.textInverse,
    letterSpacing: 0.5,
  },

  connector: {
    width: 20,
    height: 3,
    backgroundColor: colors.borderLight,
    borderRadius: 2,
    marginHorizontal: 2,
  },
  connectorDone: {
    backgroundColor: '#4CAF50',
  },

  ellipsis: {
    width: 28,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
  },
  ellipsisText: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.textMuted,
    letterSpacing: 2,
  },

  // Footer progress
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderTopWidth: 2,
    borderTopColor: colors.borderLight,
    backgroundColor: colors.surface,
  },
  footerBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.borderLight,
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  footerBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
  },
  footerLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
});
