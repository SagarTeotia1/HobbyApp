import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { useComicPanel } from '../../hooks/useComicPanel';
import { styles } from './ComicPanel.styles';
import { colors } from '../../../../app/theme';

interface Props {
  hobbyId: string;
  topicId: string;
  topicName: string;
  hobbyName: string;
  enabled?: boolean;
}

const PAGE_LABELS: Record<number, string> = {
  1: 'Introduction',
  2: 'The Principle',
  3: 'In Action',
  4: 'The Challenge',
  5: 'Mastery',
};

export function ComicPanel({ hobbyId, topicId, topicName, hobbyName, enabled = true }: Props) {
  const { data, isLoading, isError, refetch, page, totalPages, goNext, goPrev } =
    useComicPanel({ hobbyId, topicId, topicName, hobbyName, enabled });

  const renderBody = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingWrap}>
          <Text style={styles.loadingIcon}>🎨</Text>
          <ActivityIndicator color={colors.primary} size="large" />
          <Text style={styles.loadingText}>Generating manga panel...</Text>
          <Text style={styles.loadingSubText}>AI is drawing your comic • may take 30s</Text>
        </View>
      );
    }

    if (isError || !data) {
      return (
        <View style={styles.errorWrap}>
          <Text style={styles.errorIcon}>📵</Text>
          <Text style={styles.errorText}>Couldn't generate comic panel</Text>
          <Pressable style={styles.retryBtn} onPress={() => refetch()}>
            <Text style={styles.retryBtnText}>Retry</Text>
          </Pressable>
        </View>
      );
    }

    return (
      <View style={styles.imageWrap}>
        <Image
          source={{ uri: data.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    );
  };

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerIcon}>📖</Text>
          <Text style={styles.headerTitle}>Comic Learning</Text>
        </View>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>{PAGE_LABELS[page]}</Text>
        </View>
      </View>

      {/* Comic image */}
      {renderBody()}

      {/* Navigation footer */}
      <View style={styles.footer}>
        <Pressable
          style={({ pressed }) => [
            styles.navBtn,
            page === 1 && styles.navBtnDisabled,
            pressed && page > 1 && styles.navBtnPressed,
          ]}
          onPress={goPrev}
          disabled={page === 1}>
          <Text style={styles.navBtnText}>←</Text>
        </Pressable>

        <View style={styles.dotsRow}>
          {Array.from({ length: totalPages }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i + 1 === page && styles.dotActive,
                i + 1 < page && styles.dotDone,
              ]}
            />
          ))}
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.navBtn,
            page === totalPages && styles.navBtnDisabled,
            pressed && page < totalPages && styles.navBtnPressed,
          ]}
          onPress={goNext}
          disabled={page === totalPages}>
          <Text style={styles.navBtnText}>→</Text>
        </Pressable>
      </View>
    </View>
  );
}
