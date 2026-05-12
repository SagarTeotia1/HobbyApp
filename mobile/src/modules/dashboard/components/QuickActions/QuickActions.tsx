import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

interface QuickAction {
  icon: string;
  label: string;
  sub: string;
  accent: string;
  onPress: () => void;
}

interface Props {
  onRoadmap: () => void;
  onLearnGraph: () => void;
  onDetails: () => void;
  onComics: () => void;
  topicName?: string;
}

const ACCENTS = ['#B7D7F2', '#CFE1B9', '#DCCCF7', '#F4B183'];

export function QuickActions({ onRoadmap, onLearnGraph, onDetails, onComics, topicName }: Props) {
  const topic = topicName ? topicName.slice(0, 12) : 'TOPIC';

  const actions: QuickAction[] = [
    { icon: '🗺️', label: 'ROADMAP',    sub: 'Full path',       accent: ACCENTS[0], onPress: onRoadmap    },
    { icon: '🧠', label: 'LEARN GRAPH', sub: 'Visual map',     accent: ACCENTS[2], onPress: onLearnGraph },
    { icon: '📖', label: 'DETAILS',     sub: topic,            accent: ACCENTS[1], onPress: onDetails    },
    { icon: '🎭', label: 'COMICS',      sub: 'Story mode',     accent: ACCENTS[3], onPress: onComics     },
  ];

  return (
    <View style={styles.grid}>
      {actions.map((a) => (
        <Pressable
          key={a.label}
          style={({ pressed }) => [styles.btnWrap, pressed && styles.btnWrapPressed]}
          onPress={a.onPress}>
          {({ pressed }) => (
            <>
              <View style={styles.btnShadow} />
              <View style={[styles.btnFace, { backgroundColor: a.accent }, pressed && styles.btnFacePressed]}>
                {/* Corner shape decoration */}
                <View style={[styles.cornerDec, { borderRadius: a.label.length % 2 === 0 ? 6 : 40 }]} />
                <Text style={styles.icon}>{a.icon}</Text>
                <Text style={styles.label}>{a.label}</Text>
                <Text style={styles.sub}>{a.sub}</Text>
              </View>
            </>
          )}
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  btnWrap: {
    width: '47%',
    position: 'relative',
    minHeight: 96,
  },
  btnWrapPressed: {},
  btnShadow: {
    position: 'absolute',
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    backgroundColor: colors.border,
    borderRadius: radius.lg,
  },
  btnFace: {
    flex: 1,
    borderWidth: 3,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: spacing.xxs,
    overflow: 'hidden',
    position: 'relative',
    zIndex: 1,
  },
  btnFacePressed: {
    transform: [{ translateX: 4 }, { translateY: 4 }],
  },
  cornerDec: {
    position: 'absolute',
    width: 48,
    height: 48,
    backgroundColor: 'rgba(0,0,0,0.08)',
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.1)',
    top: -16,
    right: -12,
    transform: [{ rotate: '18deg' }],
  },
  icon: {
    fontSize: 22,
    zIndex: 1,
  },
  label: {
    fontSize: 11,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: 1,
    zIndex: 1,
  },
  sub: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textMuted,
    zIndex: 1,
  },
});
