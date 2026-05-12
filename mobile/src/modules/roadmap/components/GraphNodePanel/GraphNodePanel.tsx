import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { colors, spacing } from '../../../../app/theme';
import type { GraphNode } from '../../types/roadmap.types';

const TYPE_COLORS: Record<string, string> = {
  root: colors.primary,
  concept: colors.yellow,
  detail: colors.blue,
  example: colors.mint,
};

interface Props {
  node: GraphNode;
  onClose: () => void;
}

export function GraphNodePanel({ node, onClose }: Props) {
  return (
    <View style={styles.panel}>
      <View style={[styles.accent, { backgroundColor: TYPE_COLORS[node.type] ?? colors.primary }]} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.type}>{node.type.toUpperCase()}</Text>
          <Pressable onPress={onClose}>
            <Text style={styles.close}>✕</Text>
          </Pressable>
        </View>
        <Text style={styles.label}>{node.label}</Text>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
          <Text style={styles.desc}>{node.description}</Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderTopWidth: 3,
    borderTopColor: colors.border,
    backgroundColor: colors.bgElevated,
    flexDirection: 'row',
    maxHeight: 220,
  },
  accent: { width: 6 },
  content: { flex: 1, padding: spacing.md },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xs },
  type: { fontSize: 10, fontWeight: '800', letterSpacing: 1.5, color: colors.textDim },
  close: { fontSize: 14, color: colors.textDim, fontWeight: '700' },
  label: { fontSize: 16, fontWeight: '900', color: colors.text, marginBottom: spacing.xs },
  scroll: { maxHeight: 140 },
  desc: { fontSize: 13, fontWeight: '500', color: colors.textMuted, lineHeight: 19 },
});
