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

      {/* Title card */}
      <View style={styles.titleCard}>
        <View style={styles.titleCardDec} />
        <Text style={styles.nowPlaying}>▶ NOW PLAYING</Text>
        <Text style={styles.videoTitle} numberOfLines={3}>{videoTitle}</Text>
        <View style={styles.creatorRow}>
          <View style={styles.creatorDot} />
          <Text style={styles.creator}>{creator}</Text>
        </View>
      </View>

      {/* Key insight */}
      <View style={styles.insightCard}>
        <View style={styles.insightDecCircle} />
        <View style={styles.insightDecRect} />
        <View style={styles.insightHeader}>
          <View style={styles.insightIconWrap}>
            <Text style={styles.insightIcon}>💡</Text>
          </View>
          <Text style={styles.insightLabel}>KEY INSIGHT</Text>
        </View>
        <Text style={styles.insightText}>{keyInsight}</Text>
      </View>

      {/* Actions */}
      <View style={styles.actionRow}>
        <Pressable
          style={({ pressed }) => [styles.actionBtn, styles.actionBtnDetail, pressed && styles.actionBtnPressed]}
          onPress={onDetail}>
          <Text style={styles.actionBtnIcon}>📖</Text>
          <Text style={styles.actionBtnText}>DEEP DIVE</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.actionBtn, styles.actionBtnGraph, pressed && styles.actionBtnPressed]}
          onPress={onGraph}>
          <Text style={styles.actionBtnIcon}>🕸️</Text>
          <Text style={styles.actionBtnText}>LEARN GRAPH</Text>
        </Pressable>
      </View>
    </View>
  );
}
