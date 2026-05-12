import React, { useEffect, useRef } from 'react';
import { Pressable, View, Text, Animated } from 'react-native';
import { colors } from '../../../../app/theme';
import { styles } from './RoadmapNode.styles';
import type { TopicProgress } from '../../types/roadmap.types';

const NODE_ANIM_DURATION = 500;
const NODE_ANIM_DELAY = 100;

interface Props {
  topicName: string;
  topicIndex: number;
  progress: TopicProgress | undefined;
  fallbackTotalVideos?: number;
  isFirst: boolean;
  isLast: boolean;
  isLocked: boolean;
  onPress: () => void;
  onLongPress?: () => void;
  onDetail?: () => void;
  onGraph?: () => void;
}

export function RoadmapNode({
  topicName, topicIndex, progress, fallbackTotalVideos,
  isFirst, isLast, isLocked,
  onPress, onLongPress, onDetail, onGraph,
}: Props) {
  const isCompleted = progress?.completed ?? false;
  const isCurrent = !isCompleted && !isLocked;
  const watched = progress?.videosWatched ?? 0;
  const total = progress?.totalVideos ?? fallbackTotalVideos ?? 1;

  const fillAnim = useRef(new Animated.Value(isCompleted ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(fillAnim, {
      toValue: isCompleted ? 1 : 0,
      duration: NODE_ANIM_DURATION,
      delay: NODE_ANIM_DELAY,
      useNativeDriver: false,
    }).start();
  }, [isCompleted, fillAnim]);

  const cardStyle = isCompleted ? styles.cardCompleted : isCurrent ? styles.cardCurrent : styles.cardLocked;
  const dotStyle = isCompleted ? styles.dotCompleted : isCurrent ? styles.dotCurrent : styles.dotLocked;
  const labelStyle = isCompleted ? styles.labelCompleted : isCurrent ? styles.labelCurrent : styles.labelLocked;

  const label = isCompleted ? 'COMPLETED ✓' : isCurrent ? 'IN PROGRESS' : 'LOCKED';

  return (
    <View style={styles.wrapper}>
      <View style={styles.timelineRow}>
        {/* Left column: connector + dot + tail */}
        <View style={styles.dotCol}>
          {!isFirst && (
            <View style={styles.connectorTrack}>
              <Animated.View
                style={[
                  styles.connectorFill,
                  {
                    height: fillAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%'],
                    }),
                    backgroundColor: isCompleted ? colors.primary : colors.borderLight,
                  },
                ]}
              />
            </View>
          )}

          <View style={[styles.dot, dotStyle]} />

          {!isLast && (
            <View style={[styles.tail, isCompleted ? styles.tailCompleted : styles.tailPending]} />
          )}
        </View>

        {/* Right column: card + actions */}
        <View style={styles.cardCol}>
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

              {!isLocked && <View style={styles.continueDivider} />}
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
