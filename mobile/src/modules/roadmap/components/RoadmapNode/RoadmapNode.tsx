import React, { useEffect, useRef } from 'react';
import { Pressable, View, Text, Animated } from 'react-native';
import { colors } from '../../../../app/theme';
import { styles } from './RoadmapNode.styles';
import type { TopicProgress } from '../../types/roadmap.types';

const NODE_ANIM_DURATION = 450;
const NODE_ANIM_DELAY    = 80;

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
  const isCurrent   = !isCompleted && !isLocked;
  const watched     = progress?.videosWatched ?? 0;
  const total       = progress?.totalVideos ?? fallbackTotalVideos ?? 5;
  const pct         = total > 0 ? Math.round((watched / total) * 100) : 0;

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

  return (
    <View style={styles.wrapper}>
      <View style={styles.timelineRow}>

        {/* ── Left rail ── */}
        <View style={styles.dotCol}>
          {!isFirst && (
            <View style={styles.connectorTrack}>
              <Animated.View
                style={[
                  styles.connectorFill,
                  {
                    height: fillAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
                    backgroundColor: isCompleted ? colors.mint : colors.borderLight,
                  },
                ]}
              />
            </View>
          )}

          <View style={[
            styles.dot,
            isCompleted ? styles.dotCompleted : isCurrent ? styles.dotCurrent : styles.dotLocked,
          ]}>
            <Text style={[
              styles.dotNumber,
              isCompleted ? styles.dotNumberCompleted : isLocked ? styles.dotNumberLocked : null,
            ]}>
              {isCompleted ? '✓' : isLocked ? '🔒' : `${topicIndex + 1 < 10 ? '0' : ''}${topicIndex + 1}`}
            </Text>
          </View>

          {!isLast && (
            <View style={[styles.tail, isCompleted ? styles.tailCompleted : styles.tailPending]} />
          )}
        </View>

        {/* ── Right card ── */}
        <View style={styles.cardCol}>
          <Pressable
            style={({ pressed }) => [styles.card, cardStyle, pressed && !isLocked && styles.cardPressed]}
            onPress={isLocked ? undefined : onPress}
            onLongPress={isLocked ? undefined : onLongPress}
            delayLongPress={400}
            disabled={isLocked}>

            {/* Card body */}
            <View style={styles.cardBody}>
              <View style={styles.cardContent}>

                {/* Status badge + part label */}
                <View style={styles.topRow}>
                  <View style={[
                    styles.statusBadge,
                    isCompleted ? styles.statusBadgeCompleted
                      : isCurrent ? styles.statusBadgeCurrent
                      : styles.statusBadgeLocked,
                  ]}>
                    <Text style={[
                      styles.statusText,
                      isLocked && styles.statusTextDark,
                    ]}>
                      {isCompleted ? 'COMPLETED' : isCurrent ? 'IN PROGRESS' : 'LOCKED'}
                    </Text>
                  </View>
                  <Text style={styles.partLabel}>PART {topicIndex + 1}</Text>
                </View>

                {/* Topic title */}
                <Text
                  style={[
                    styles.title,
                    isLocked ? styles.titleLocked : isCurrent ? styles.titleCurrent : null,
                  ]}
                  numberOfLines={2}>
                  {topicName}
                </Text>

                {/* Progress bar */}
                {!isLocked && (
                  <View style={styles.progressWrap}>
                    <View style={styles.progressTrack}>
                      <View style={[
                        styles.progressFill,
                        isCompleted ? styles.progressFillComplete : styles.progressFillCurrent,
                        { width: `${Math.max(isCompleted ? 100 : pct, (watched > 0 || isCompleted) ? 4 : 0)}%` as `${number}%` },
                      ]} />
                    </View>
                    <View style={styles.progressMeta}>
                      <Text style={styles.progressMetaText}>{watched}/{total} videos</Text>
                      <Text style={styles.progressMetaText}>{isCompleted ? '100%' : `${pct}%`}</Text>
                    </View>
                  </View>
                )}
              </View>

              {/* Chevron / lock icon */}
              <View style={[styles.chevronWrap, isCurrent && styles.chevronWrapCurrent]}>
                {isLocked ? (
                  <Text style={styles.lockChevron}>🔒</Text>
                ) : (
                  <Text style={[styles.chevronText, isCurrent && styles.chevronTextCurrent]}>›</Text>
                )}
              </View>
            </View>

            {/* Action strip */}
            {!isLocked && (
              <View style={styles.actionStrip}>
                <Pressable
                  style={({ pressed }) => [styles.actionBtn, styles.actionBtnLeft, pressed && styles.actionBtnPressed]}
                  onPress={onDetail}>
                  <Text style={styles.actionBtnIcon}>📖</Text>
                  <Text style={[styles.actionBtnLabel, styles.actionBtnLabelDetail]}>DETAILS</Text>
                </Pressable>
                <Pressable
                  style={({ pressed }) => [styles.actionBtn, pressed && styles.actionBtnPressed]}
                  onPress={onGraph}>
                  <Text style={styles.actionBtnIcon}>🕸️</Text>
                  <Text style={[styles.actionBtnLabel, styles.actionBtnLabelGraph]}>LEARN GRAPH</Text>
                </Pressable>
              </View>
            )}
          </Pressable>
        </View>

      </View>
    </View>
  );
}
