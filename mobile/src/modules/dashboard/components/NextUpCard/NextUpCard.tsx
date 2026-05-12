import React from 'react';
import { View, Text, Pressable, ImageBackground, ActivityIndicator } from 'react-native';
import { useFeedVideos } from '../../../learning-feed/hooks/useFeedVideos';
import { styles } from './NextUpCard.styles';
import type { DifficultyLevel } from '../../../../shared/types/card.types';
import { colors } from '../../../../app/theme';

interface Props {
  hobbyId: string;
  hobbyName: string;
  topicId: string;
  topicName: string;
  topicIndex: number;
  skillLevel: DifficultyLevel;
  onPress: () => void;
}

export function NextUpCard({ hobbyId, hobbyName, topicId, topicName, topicIndex, skillLevel, onPress }: Props) {
  const { data: videos, isLoading } = useFeedVideos(hobbyId, topicId, topicIndex, hobbyName, topicName, skillLevel);
  const thumbnailUrl = videos?.[0]?.thumbnailUrl;

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}>

      {/* ── Thumbnail ── */}
      {thumbnailUrl ? (
        /* Real YouTube thumbnail */
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
        /* Abstract poster art fallback */
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

      {/* ── Info strip ── */}
      <View style={styles.infoStrip}>
        <View style={styles.badgeRow}>
          <View style={styles.upNextBadge}>
            <Text style={styles.upNextText}>UP NEXT</Text>
          </View>
          <Text style={styles.partLabel}>PART {topicIndex + 1}</Text>
        </View>
        <Text style={styles.title} numberOfLines={1}>{topicName}</Text>
        <Text style={styles.subtitle}>Tap to start learning →</Text>
      </View>
    </Pressable>
  );
}
