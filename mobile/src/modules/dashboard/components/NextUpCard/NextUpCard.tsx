import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles } from './NextUpCard.styles';
import type { DifficultyLevel } from '../../../../shared/types/card.types';

interface Props {
  hobbyId: string;
  hobbyName: string;
  topicId: string;
  topicName: string;
  topicIndex: number;
  skillLevel: DifficultyLevel;
  onPress: () => void;
}

export function NextUpCard({ topicName, topicIndex, onPress }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}>

      {/* ── Abstract poster thumbnail ── */}
      <View style={styles.thumbnail}>
        {/* Decorative shapes */}
        <View style={styles.blockYellow} />
        <View style={styles.blockTeal} />
        <View style={styles.blockPurple} />
        <View style={styles.dotAccent} />
        <View style={styles.lineDecor} />

        {/* Centered play button */}
        <View style={styles.playBtnOverlay} pointerEvents="none">
          <View style={styles.playBtn}>
            <Text style={styles.playIcon}>▶</Text>
          </View>
        </View>

        {/* XP badge */}
        <View style={styles.xpBadge}>
          <Text style={styles.xpBadgeText}>+120 XP</Text>
        </View>
      </View>

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
