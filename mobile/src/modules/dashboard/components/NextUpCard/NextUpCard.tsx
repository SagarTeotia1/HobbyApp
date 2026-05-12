import React from 'react';
import {
  View, Text, Pressable, ImageBackground,
  ActivityIndicator, StyleSheet, ScrollView,
} from 'react-native';
import { useFeedVideos } from '../../../learning-feed/hooks/useFeedVideos';
import { styles } from './NextUpCard.styles';
import type { DifficultyLevel } from '../../../../shared/types/card.types';
import type { RoadmapStage, TopicProgress } from '../../../roadmap/types/roadmap.types';
import { colors, spacing, radius } from '../../../../app/theme';

interface Props {
  hobbyId: string;
  hobbyName: string;
  topicId: string;
  topicName: string;
  topicIndex: number;
  skillLevel: DifficultyLevel;
  stages?: RoadmapStage[];
  getTopicProgress?: (hobbyId: string, topicId: string) => TopicProgress | undefined;
  onPress: () => void;
  onTopicPress?: (stage: RoadmapStage, index: number) => void;
  onLearnGraph?: () => void;
  onDetails?: () => void;
  onComics?: () => void;
}

const VISIBLE = 7;

export function NextUpCard({
  hobbyId, hobbyName, topicId, topicName, topicIndex, skillLevel,
  stages = [], getTopicProgress,
  onPress, onTopicPress, onLearnGraph, onDetails, onComics,
}: Props) {
  const { data: videos, isLoading } = useFeedVideos(
    hobbyId, topicId, topicIndex, hobbyName, topicName, skillLevel,
  );
  const thumbnailUrl = videos?.[0]?.thumbnailUrl;
  const videoCount = videos?.length ?? 0;

  // Path window centred on active topic
  const activeIdx = topicIndex;
  const half = Math.floor(VISIBLE / 2);
  let start = Math.max(0, activeIdx - half);
  const end = Math.min(stages.length, start + VISIBLE);
  start = Math.max(0, end - VISIBLE);
  const slice = stages.slice(start, end);

  const actions = [
    { icon: '🧠', label: 'GRAPH',   accent: '#DCCCF7', onPress: onLearnGraph ?? onPress },
    { icon: '📖', label: 'DETAILS', accent: '#CFE1B9', onPress: onDetails    ?? onPress },
    { icon: '🎭', label: 'COMICS',  accent: '#F4B183', onPress: onComics     ?? onPress },
  ];

  return (
    <View style={styles.card}>

      {/* ── Dark teal header ── */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.headerDot} />
          <Text style={styles.headerLabel}>CONTINUE LEARNING</Text>
        </View>
        <View style={styles.partChip}>
          <Text style={styles.partChipText}>PART {topicIndex + 1}</Text>
        </View>
      </View>

      {/* ── Info body: topic name + inline play btn ── */}
      <Pressable
        style={({ pressed }) => [
          styles.infoBody,
          pressed && { opacity: 0.85 },
        ]}
        onPress={onPress}>
        <View style={styles.infoLeft}>
          <Text style={styles.topicName} numberOfLines={2}>{topicName}</Text>
          <View style={styles.chipRow}>
            {videoCount > 0 && (
              <View style={[styles.chip, { backgroundColor: colors.surface }]}>
                <Text style={styles.chipText}>{videoCount} VIDEOS</Text>
              </View>
            )}
            <View style={[styles.chip, { backgroundColor: '#CFE1B9' }]}>
              <Text style={styles.chipText}>+75 XP</Text>
            </View>
          </View>
          <Text style={styles.tapHint}>Tap to start →</Text>
        </View>

        <Pressable
          style={({ pressed }) => [styles.bigPlayBtn, pressed && styles.bigPlayBtnPressed]}
          onPress={onPress}>
          {isLoading
            ? <ActivityIndicator size="small" color={colors.yellow} />
            : <Text style={styles.bigPlayIcon}>▶</Text>
          }
          <Text style={styles.bigPlayLabel}>START</Text>
        </Pressable>
      </Pressable>

      {/* ── Thumbnail (if real image, show below info) ── */}
      {thumbnailUrl && (
        <Pressable onPress={onPress}>
          <ImageBackground
            source={{ uri: thumbnailUrl }}
            style={thumbStyles.strip}
            imageStyle={{ resizeMode: 'cover' }}>
            <View style={thumbStyles.overlay} />
            <View style={thumbStyles.playWrap}>
              <View style={thumbStyles.playBtn}>
                <Text style={thumbStyles.playIcon}>▶</Text>
              </View>
            </View>
          </ImageBackground>
        </Pressable>
      )}

      {/* ── Learning path track ── */}
      {slice.length > 0 && (
        <View style={pathStyles.section}>
          <View style={pathStyles.sectionHeader}>
            <Text style={pathStyles.sectionLabel}>YOUR PATH</Text>
            <Text style={pathStyles.sectionCount}>
              {topicIndex + 1} / {stages.length} topics
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={pathStyles.track}>

            {start > 0 && (
              <View style={pathStyles.ellipsis}>
                <Text style={pathStyles.ellipsisText}>···</Text>
              </View>
            )}

            {slice.map((stage, i) => {
              const absIdx = start + i;
              const progress = getTopicProgress?.(hobbyId, stage.conceptId);
              const isCompleted = progress?.completed === true;
              const isCurrent = absIdx === activeIdx;
              const isLocked = absIdx > activeIdx && !isCompleted;
              const videosPct = isCurrent && progress && (progress.totalVideos ?? 0) > 0
                ? Math.round((progress.videosWatched / progress.totalVideos!) * 100)
                : 0;

              return (
                <React.Fragment key={stage.conceptId}>
                  <Pressable
                    style={({ pressed }) => [
                      pathStyles.node,
                      isCompleted && pathStyles.nodeCompleted,
                      isCurrent  && pathStyles.nodeCurrent,
                      isLocked   && pathStyles.nodeLocked,
                      pressed && !isLocked && pathStyles.nodePressed,
                    ]}
                    onPress={() => !isLocked && onTopicPress?.(stage, absIdx)}
                    disabled={isLocked}>

                    <View style={[
                      pathStyles.nodeIcon,
                      isCompleted && pathStyles.nodeIconDone,
                      isCurrent  && pathStyles.nodeIconActive,
                    ]}>
                      <Text style={[
                        pathStyles.nodeIconText,
                        (isCompleted || isCurrent) && { color: '#fff' },
                      ]}>
                        {isCompleted ? '✓' : isCurrent ? '▶' : `${absIdx + 1}`}
                      </Text>
                    </View>

                    <Text
                      style={[pathStyles.nodeLabel, isLocked && pathStyles.nodeLabelLocked]}
                      numberOfLines={2}>
                      {stage.title}
                    </Text>

                    {isCurrent && videosPct > 0 && (
                      <View style={pathStyles.miniBar}>
                        <View style={[pathStyles.miniBarFill, { width: `${videosPct}%` as `${number}%` }]} />
                      </View>
                    )}
                  </Pressable>

                  {i < slice.length - 1 && (
                    <View style={[
                      pathStyles.connector,
                      isCompleted && pathStyles.connectorDone,
                      isCurrent  && pathStyles.connectorActive,
                    ]} />
                  )}
                </React.Fragment>
              );
            })}

            {end < stages.length && (
              <View style={pathStyles.ellipsis}>
                <Text style={pathStyles.ellipsisText}>···</Text>
              </View>
            )}
          </ScrollView>
        </View>
      )}

      {/* ── Action buttons ── */}
      <View style={actionStyles.row}>
        {actions.map((a) => (
          <Pressable
            key={a.label}
            style={({ pressed }) => [
              actionStyles.btn,
              { backgroundColor: a.accent },
              pressed && actionStyles.btnPressed,
            ]}
            onPress={(e) => { e.stopPropagation?.(); a.onPress(); }}>
            <Text style={actionStyles.btnIcon}>{a.icon}</Text>
            <Text style={actionStyles.btnLabel}>{a.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

/* ── Thumbnail strip (real image) ───────────────────────────────── */
const thumbStyles = StyleSheet.create({
  strip: {
    height: 130,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  playWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBtn: {
    width: 54, height: 54,
    borderRadius: 27,
    backgroundColor: colors.yellow,
    borderWidth: 3, borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 4,
    shadowColor: colors.shadow,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    shadowOpacity: 1,
  },
  playIcon: { fontSize: 18, color: colors.text },
});

/* ── Path track ─────────────────────────────────────────────────── */
const pathStyles = StyleSheet.create({
  section: {
    borderTopWidth: 2,
    borderTopColor: colors.borderLight,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xs,
  },
  sectionLabel: {
    fontSize: 9, fontWeight: '900',
    color: colors.textMuted, letterSpacing: 2,
  },
  sectionCount: {
    fontSize: 9, fontWeight: '700',
    color: colors.textDim,
  },
  track: {
    paddingHorizontal: spacing.md,
    alignItems: 'center',
  },

  node: {
    width: 68,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.borderLight,
    borderRadius: 8,
    paddingVertical: spacing.xs,
    paddingHorizontal: 4,
    alignItems: 'center',
    gap: 3,
  },
  nodeCompleted: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  nodeCurrent: {
    backgroundColor: colors.yellow,
    borderColor: colors.border,
    borderWidth: 2.5,
    shadowColor: colors.shadow,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 2,
  },
  nodeLocked: { opacity: 0.35 },
  nodePressed: { transform: [{ scale: 0.93 }] },

  nodeIcon: {
    width: 24, height: 24,
    borderRadius: 12,
    backgroundColor: colors.borderLight,
    borderWidth: 1.5, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  nodeIconDone: { backgroundColor: '#4CAF50', borderColor: '#2E7D32' },
  nodeIconActive: { backgroundColor: colors.primary, borderColor: colors.border },
  nodeIconText: { fontSize: 9, fontWeight: '900', color: colors.textMuted },

  nodeLabel: {
    fontSize: 7.5, fontWeight: '800',
    color: colors.text, textAlign: 'center',
    letterSpacing: 0.2, lineHeight: 10,
  },
  nodeLabelLocked: { color: colors.textMuted },

  miniBar: {
    width: '100%', height: 3,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 2, overflow: 'hidden',
    marginTop: 1,
  },
  miniBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },

  connector: {
    width: 14, height: 2.5,
    backgroundColor: colors.borderLight,
    borderRadius: 2,
    marginHorizontal: 2,
  },
  connectorDone: { backgroundColor: '#4CAF50' },
  connectorActive: { backgroundColor: colors.yellow },

  ellipsis: { width: 22, alignItems: 'center', justifyContent: 'center' },
  ellipsisText: { fontSize: 13, fontWeight: '900', color: colors.textMuted, letterSpacing: 2 },
});

/* ── Action buttons ─────────────────────────────────────────────── */
const actionStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.xs,
    padding: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 2,
    borderTopColor: colors.borderLight,
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    paddingVertical: spacing.sm,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 8,
    shadowColor: colors.shadow,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 2,
  },
  btnPressed: {
    transform: [{ translateX: 2 }, { translateY: 2 }],
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
  btnIcon: { fontSize: 17 },
  btnLabel: { fontSize: 8, fontWeight: '900', color: colors.text, letterSpacing: 0.8 },
});
