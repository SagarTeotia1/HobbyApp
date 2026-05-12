import React, { useCallback } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, radius } from '../../../../app/theme';
import type { FeedVideo } from '../../types/feed.types';

const VIDEO_THUMB_BG = '#111111';
const VIDEO_PLACEHOLDER_BG = '#222222';
const THUMB_OVERLAY_BG = 'rgba(0,0,0,0.7)';

interface Props {
  visible: boolean;
  videos: FeedVideo[];
  currentIndex: number;
  watchedIndices: Set<number>;
  topicName: string;
  onSelect: (index: number) => void;
  onClose: () => void;
}

export function VideoListSheet({
  visible,
  videos,
  currentIndex,
  watchedIndices,
  topicName,
  onSelect,
  onClose,
}: Props) {
  const renderItem = useCallback(
    ({ item, index }: { item: FeedVideo; index: number }) => {
      const isCurrent = index === currentIndex;
      const isWatched = watchedIndices.has(index);

      return (
        <Pressable
          style={({ pressed }) => [
            styles.item,
            isCurrent && styles.itemCurrent,
            pressed && styles.itemPressed,
          ]}
          onPress={() => { onSelect(index); onClose(); }}>

          {/* Thumbnail */}
          <View style={styles.thumbWrap}>
            {item.thumbnailUrl ? (
              <Image
                source={{ uri: item.thumbnailUrl }}
                style={styles.thumb}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.thumbPlaceholder}>
                <Text style={styles.thumbPlaceholderIcon}>🎬</Text>
              </View>
            )}
            <View style={styles.thumbOverlay}>
              <Text style={styles.thumbNum}>{index + 1}</Text>
            </View>
            {isWatched && (
              <View style={styles.watchedBadge}>
                <Text style={styles.watchedCheck}>✓</Text>
              </View>
            )}
            {isCurrent && (
              <View style={styles.playingBadge}>
                <Text style={styles.playingText}>▶</Text>
              </View>
            )}
          </View>

          {/* Info */}
          <View style={styles.info}>
            <Text style={[styles.title, isCurrent && styles.titleCurrent]} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.creator}>{item.creator}</Text>
            {item.durationSeconds != null && (
              <Text style={styles.duration}>
                {Math.floor(item.durationSeconds / 60)}:{String(item.durationSeconds % 60).padStart(2, '0')}
              </Text>
            )}
          </View>
        </Pressable>
      );
    },
    [currentIndex, watchedIndices, onSelect, onClose],
  );

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

      <SafeAreaView style={styles.sheet} edges={['bottom']}>
        {/* Handle */}
        <View style={styles.handle} />

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Playlist</Text>
            <Text style={styles.headerSub} numberOfLines={1}>{topicName}</Text>
          </View>
          <Pressable
            style={({ pressed }) => [styles.closeBtn, pressed && styles.closeBtnPressed]}
            onPress={onClose}>
            <Text style={styles.closeBtnText}>✕</Text>
          </Pressable>
        </View>

        <FlashList
          data={videos}
          keyExtractor={(v) => v.id}
          renderItem={renderItem}
          estimatedItemSize={84}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
      </View>
    </Modal>
  );
}

const THUMB_W = 120;
const THUMB_H = 68;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
  },
  sheet: {
    backgroundColor: colors.bg,
    borderTopWidth: 3,
    borderTopColor: colors.border,
    maxHeight: '75%',
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.border,
    borderRadius: radius.pill,
    alignSelf: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
  },
  headerTitle: { fontSize: 18, fontWeight: '900', color: colors.text },
  headerSub: { fontSize: 12, fontWeight: '600', color: colors.textMuted, marginTop: 2 },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.bgElevated,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 2,
  },
  closeBtnPressed: {
    transform: [{ translateX: 2 }, { translateY: 2 }],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  closeBtnText: { fontSize: 12, fontWeight: '900', color: colors.text },
  list: { padding: spacing.md, gap: spacing.sm, paddingBottom: spacing.xl },
  item: {
    flexDirection: 'row',
    gap: spacing.md,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.bgElevated,
    padding: spacing.sm,
    shadowColor: colors.shadow,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 3,
  },
  itemCurrent: {
    borderColor: colors.yellow,
    backgroundColor: colors.yellowLight,
  },
  itemPressed: {
    transform: [{ translateX: 3 }, { translateY: 3 }],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  thumbWrap: {
    width: THUMB_W,
    height: THUMB_H,
    borderRadius: radius.sm,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: VIDEO_THUMB_BG,
  },
  thumb: { width: '100%', height: '100%' },
  thumbPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: VIDEO_PLACEHOLDER_BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbPlaceholderIcon: { fontSize: 24 },
  thumbOverlay: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    backgroundColor: THUMB_OVERLAY_BG,
    borderRadius: radius.sm,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  thumbNum: { color: colors.textInverse, fontSize: 10, fontWeight: '900' },
  watchedBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.mint,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  watchedCheck: { color: colors.textInverse, fontSize: 10, fontWeight: '900' },
  playingBadge: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.yellow,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playingText: { color: colors.text, fontSize: 8, fontWeight: '900' },
  info: { flex: 1, justifyContent: 'center', gap: 3 },
  title: { fontSize: 13, fontWeight: '800', color: colors.text, lineHeight: 18 },
  titleCurrent: { color: colors.primary },
  creator: { fontSize: 11, fontWeight: '600', color: colors.textMuted },
  duration: { fontSize: 10, fontWeight: '700', color: colors.textDim },
});
