import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles } from './VideoFlashcard.styles';

interface Props {
  videoTitle: string;
  creator: string;
  keyInsight: string;
  currentIndex: number;
  totalVideos: number;
  onGotIt: () => void;
  onNext: () => void;
  isLast: boolean;
}

export function VideoFlashcard({
  videoTitle,
  creator,
  keyInsight,
  currentIndex,
  totalVideos,
  onGotIt,
  onNext,
  isLast,
}: Props) {
  return (
    <View style={styles.root}>
      <View style={styles.topRow}>
        <View style={styles.titleBlock}>
          <Text style={styles.videoTitle} numberOfLines={2}>{videoTitle}</Text>
          <View style={styles.creatorRow}>
            <View style={styles.creatorDot} />
            <Text style={styles.creator}>{creator}</Text>
          </View>
        </View>
        <View style={styles.progressPill}>
          <Text style={styles.progressPillText}>{currentIndex + 1}/{totalVideos}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.insightCard}>
        <Text style={styles.insightLabel}>💡 Key Insight</Text>
        <Text style={styles.insightText}>{keyInsight}</Text>
      </View>

      <View style={styles.actionsRow}>
        <Pressable
          style={({ pressed }) => [styles.btnGotIt, pressed && styles.btnGotItPressed]}
          onPress={onGotIt}>
          <Text style={styles.btnGotItText}>✓ Got It</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.btnNext, pressed && styles.btnNextPressed]}
          onPress={onNext}>
          <Text style={styles.btnNextText}>{isLast ? 'Finish 🏁' : 'Next →'}</Text>
        </Pressable>
      </View>
    </View>
  );
}
