import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles } from './VideoFlashcard.styles';

interface Props {
  videoTitle: string;
  creator: string;
  keyInsight: string;
  onDetail?: () => void;
  onGraph?: () => void;
}

export function VideoFlashcard({ videoTitle, creator, keyInsight, onDetail, onGraph }: Props) {
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
      </View>

      <View style={styles.divider} />

      <View style={styles.actionRow}>
        <Pressable
          style={({ pressed }) => [styles.actionBtn, pressed && styles.actionBtnPressed]}
          onPress={onDetail}>
          <Text style={styles.actionBtnText}>🧠 Detail</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.actionBtn, styles.actionBtnGraph, pressed && styles.actionBtnPressed]}
          onPress={onGraph}>
          <Text style={styles.actionBtnText}>🕸️ Graph</Text>
        </Pressable>
      </View>

      <View style={styles.insightCard}>
        <Text style={styles.insightLabel}>💡 Key Insight</Text>
        <Text style={styles.insightText}>{keyInsight}</Text>
      </View>
    </View>
  );
}
