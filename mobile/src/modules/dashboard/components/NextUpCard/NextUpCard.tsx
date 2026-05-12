import React from 'react';
import { View, Text, Pressable, ImageBackground, ActivityIndicator, StyleSheet } from 'react-native';
import { useFeedVideos } from '../../../learning-feed/hooks/useFeedVideos';
import { styles } from './NextUpCard.styles';
import type { DifficultyLevel } from '../../../../shared/types/card.types';
import { colors, spacing, radius } from '../../../../app/theme';

interface Action {
  icon: string;
  label: string;
  accent: string;
  onPress: () => void;
}

interface Props {
  hobbyId: string;
  hobbyName: string;
  topicId: string;
  topicName: string;
  topicIndex: number;
  skillLevel: DifficultyLevel;
  onPress: () => void;
  onRoadmap?: () => void;
  onLearnGraph?: () => void;
  onDetails?: () => void;
  onComics?: () => void;
}

export function NextUpCard({
  hobbyId, hobbyName, topicId, topicName, topicIndex, skillLevel,
  onPress, onRoadmap, onLearnGraph, onDetails, onComics,
}: Props) {
  const { data: videos, isLoading } = useFeedVideos(hobbyId, topicId, topicIndex, hobbyName, topicName, skillLevel);
  const thumbnailUrl = videos?.[0]?.thumbnailUrl;

  const actions: Action[] = [
    { icon: '🗺️', label: 'ROADMAP',   accent: '#B7D7F2', onPress: onRoadmap    ?? onPress },
    { icon: '🧠', label: 'GRAPH',     accent: '#DCCCF7', onPress: onLearnGraph  ?? onPress },
    { icon: '📖', label: 'DETAILS',   accent: '#CFE1B9', onPress: onDetails     ?? onPress },
    { icon: '🎭', label: 'COMICS',    accent: '#F4B183', onPress: onComics      ?? onPress },
  ];

  return (
    <View style={styles.card}>

      {/* ── Thumbnail — tappable for feed ── */}
      <Pressable
        style={({ pressed }) => [pressed && styles.cardPressed]}
        onPress={onPress}>
        {thumbnailUrl ? (
          <ImageBackground
            source={{ uri: thumbnailUrl }}
            style={styles.thumbnail}
            imageStyle={styles.thumbnailImage}>
            <View style={styles.playBtnOverlay} pointerEvents="none">
              <View style={styles.playBtn}>
                <Text style={styles.playIcon}>▶</Text>
              </View>
            </View>
            <View style={styles.xpBadge}>
              <Text style={styles.xpBadgeText}>+120 XP</Text>
            </View>
          </ImageBackground>
        ) : (
          <View style={styles.thumbnail}>
            <View style={styles.blockYellow} />
            <View style={styles.blockTeal} />
            <View style={styles.blockPurple} />
            <View style={styles.dotAccent} />
            <View style={styles.lineDecor} />
            <View style={styles.playBtnOverlay} pointerEvents="none">
              {isLoading ? (
                <ActivityIndicator size="large" color={colors.yellow} />
              ) : (
                <View style={styles.playBtn}>
                  <Text style={styles.playIcon}>▶</Text>
                </View>
              )}
            </View>
            <View style={styles.xpBadge}>
              <Text style={styles.xpBadgeText}>+120 XP</Text>
            </View>
          </View>
        )}
      </Pressable>

      {/* ── Info strip ── */}
      <Pressable style={styles.infoStrip} onPress={onPress}>
        <View style={styles.badgeRow}>
          <View style={styles.upNextBadge}>
            <Text style={styles.upNextText}>UP NEXT</Text>
          </View>
          <Text style={styles.partLabel}>PART {topicIndex + 1}</Text>
        </View>
        <Text style={styles.title} numberOfLines={1}>{topicName}</Text>
        <Text style={styles.subtitle}>Tap to start learning →</Text>
      </Pressable>

      {/* ── Quick action row ── */}
      <View style={actionStyles.row}>
        {actions.map((a) => (
          <Pressable
            key={a.label}
            style={({ pressed }) => [actionStyles.btn, { backgroundColor: a.accent }, pressed && actionStyles.btnPressed]}
            onPress={(e) => { e.stopPropagation?.(); a.onPress(); }}>
            <Text style={actionStyles.btnIcon}>{a.icon}</Text>
            <Text style={actionStyles.btnLabel}>{a.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const actionStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    paddingTop: spacing.xs,
    borderTopWidth: 2,
    borderTopColor: colors.borderLight,
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingVertical: spacing.sm,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
  },
  btnPressed: {
    transform: [{ scale: 0.94 }],
    opacity: 0.85,
  },
  btnIcon: {
    fontSize: 16,
  },
  btnLabel: {
    fontSize: 8,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: 0.8,
  },
});
