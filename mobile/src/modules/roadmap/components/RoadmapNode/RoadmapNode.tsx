import React from 'react';
import { Pressable, View, Text } from 'react-native';
import { styles } from './RoadmapNode.styles';
import type { TopicProgress } from '../../types/roadmap.types';

interface Props {
  topicName: string;
  topicIndex: number;
  progress: TopicProgress | undefined;
  isFirst: boolean;
  isLast: boolean;
  isLocked: boolean;
  onPress: () => void;
  onLongPress?: () => void;
  onDetail?: () => void;
  onGraph?: () => void;
}

export function RoadmapNode({
  topicName, topicIndex, progress,
  isFirst, isLast, isLocked,
  onPress, onLongPress, onDetail, onGraph,
}: Props) {
  const isCompleted = progress?.completed ?? false;
  const isCurrent = !isCompleted && !isLocked;
  const watched = progress?.videosWatched ?? 0;
  const total = progress?.totalVideos ?? 1;

  const cardStyle = isCompleted ? styles.cardCompleted : isCurrent ? styles.cardCurrent : styles.cardLocked;
  const dotStyle = isCompleted ? styles.dotCompleted : isCurrent ? styles.dotCurrent : styles.dotLocked;
  const labelStyle = isCompleted ? styles.labelCompleted : isCurrent ? styles.labelCurrent : styles.labelLocked;
  const connectorStyle = isCompleted ? styles.connectorCompleted : isLocked ? styles.connectorLocked : styles.connector;

  const label = isCompleted ? 'COMPLETED ✓' : isCurrent ? 'IN PROGRESS' : 'LOCKED';

  return (
    <View style={styles.wrapper}>
      {!isFirst && <View style={[styles.connector, connectorStyle]} />}
      <View style={styles.row}>
        <View style={[styles.dot, dotStyle]} />
        <View style={styles.cardColumn}>

          <Pressable
            style={({ pressed }) => [styles.card, cardStyle, pressed && !isLocked && styles.cardPressed]}
            onPress={isLocked ? undefined : onPress}
            onLongPress={isLocked ? undefined : onLongPress}
            delayLongPress={400}
            disabled={isLocked}>
            <View style={styles.cardInner}>
              <View style={styles.cardContent}>
                <View style={styles.topRow}>
                  <Text style={[styles.label, labelStyle]}>{label}</Text>
                  {isCompleted && <Text style={styles.checkmark}>✓</Text>}
                  {isLocked && <Text style={styles.lockIcon}>🔒</Text>}
                </View>
                <Text style={[styles.title, isLocked && styles.titleLocked]} numberOfLines={2}>
                  {topicIndex + 1}. {topicName}
                </Text>
                {!isLocked && (
                  <View style={styles.progressRow}>
                    {Array.from({ length: total }).map((_, i) => (
                      <View
                        key={i}
                        style={[styles.progressDot, i >= watched && styles.progressDotEmpty]}
                      />
                    ))}
                  </View>
                )}
              </View>

              {!isLocked && (
                <View style={styles.continueDivider} />
              )}
              {!isLocked && (
                <View style={styles.continueSection}>
                  <Text style={styles.continueBtnText}>›</Text>
                </View>
              )}
            </View>
          </Pressable>

          {!isLocked && (
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
          )}
        </View>
      </View>
    </View>
  );
}
