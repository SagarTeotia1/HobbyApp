import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { ScreenHeader } from '../../../shared/components/ui/ScreenHeader/ScreenHeader';
import { GraphNodePanel } from '../components/GraphNodePanel/GraphNodePanel';
import { LearnGraph } from '../components/LearnGraph';
import { colors, spacing, radius } from '../../../app/theme';
import { ROUTES } from '../../../app/navigation/routes';
import type { AppStackParamList } from '../../../app/navigation/types';
import { useLearnGraph } from '../hooks/useLearnGraph';
import type { GraphNode } from '../types/roadmap.types';

type Nav   = NativeStackNavigationProp<AppStackParamList, typeof ROUTES.LEARN_GRAPH>;
type Route = RouteProp<AppStackParamList, typeof ROUTES.LEARN_GRAPH>;

const NODE_TYPES: { key: string; label: string; color: string; accent: string }[] = [
  { key: 'root',    label: 'ROOT',    color: colors.primary, accent: colors.textInverse },
  { key: 'concept', label: 'CONCEPT', color: colors.yellow,  accent: colors.text },
  { key: 'detail',  label: 'DETAIL',  color: '#B7D7F2',      accent: colors.text },
  { key: 'example', label: 'EXAMPLE', color: '#CFE1B9',      accent: colors.text },
];

export function LearnGraphScreen() {
  const navigation = useNavigation<Nav>();
  const { params } = useRoute<Route>();
  const { graph, isLoading, error, fetch } = useLearnGraph();
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);

  useEffect(() => {
    void fetch({ hobbyId: params.hobbyId, topicId: params.topicId, topicName: params.topicName, hobbyName: params.hobbyName });
  }, [fetch, params.hobbyId, params.topicId, params.topicName, params.hobbyName]);

  const handleRetry = () => void fetch({ hobbyId: params.hobbyId, topicId: params.topicId, topicName: params.topicName, hobbyName: params.hobbyName });

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScreenHeader title={params.topicName} onBack={() => navigation.goBack()} />

      {/* Legend strip */}
      {graph !== null && (
        <View style={styles.legendStrip}>
          <Text style={styles.legendTitle}>NODE TYPES</Text>
          <View style={styles.legendItems}>
            {NODE_TYPES.map((t) => (
              <View key={t.key} style={[styles.legendPill, { backgroundColor: t.color, borderColor: colors.border }]}>
                <View style={[styles.legendDot, { backgroundColor: t.accent === colors.text ? colors.border : 'rgba(255,255,255,0.4)' }]} />
                <Text style={[styles.legendLabel, { color: t.accent }]}>{t.label}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Loading */}
      {isLoading && (
        <View style={styles.center}>
          <View style={styles.loadingCard}>
            <View style={styles.loadingIconWrap}>
              <Text style={styles.loadingIcon}>🕸️</Text>
            </View>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingTitle}>BUILDING GRAPH</Text>
            <Text style={styles.loadingText}>AI is mapping the knowledge network…</Text>
          </View>
        </View>
      )}

      {/* Error */}
      {error !== null && (
        <View style={styles.center}>
          <View style={styles.errorCard}>
            <Text style={styles.errorEmoji}>⚠️</Text>
            <Text style={styles.errorText}>{error}</Text>
            <Pressable
              style={({ pressed }) => [styles.retryBtn, pressed && styles.retryBtnPressed]}
              onPress={handleRetry}>
              <Text style={styles.retryText}>TRY AGAIN</Text>
            </Pressable>
          </View>
        </View>
      )}

      {/* Graph */}
      {graph !== null && !isLoading && (
        <LearnGraph
          nodes={graph.nodes}
          edges={graph.edges}
          selectedId={selectedNode?.id ?? null}
          onNodePress={(node) => setSelectedNode((prev) => (prev?.id === node.id ? null : node))}
        />
      )}

      {/* Node panel */}
      {selectedNode !== null && (
        <GraphNodePanel node={selectedNode} onClose={() => setSelectedNode(null)} />
      )}

      {/* Tap hint */}
      {graph !== null && selectedNode === null && (
        <View style={styles.tapHint}>
          <View style={styles.tapHintInner}>
            <Text style={styles.tapHintIcon}>👆</Text>
            <Text style={styles.tapHintText}>TAP ANY NODE TO EXPLORE</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },

  // Legend
  legendStrip: {
    backgroundColor: colors.bgElevated,
    borderBottomWidth: 2.5,
    borderBottomColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    gap: spacing.xs,
  },
  legendTitle: {
    fontSize: 8,
    fontWeight: '900',
    color: colors.textDim,
    letterSpacing: 2,
  },
  legendItems: { flexDirection: 'row', gap: spacing.sm, flexWrap: 'wrap' },
  legendPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.pill,
    borderWidth: 2,
  },
  legendDot: { width: 5, height: 5, borderRadius: 3 },
  legendLabel: { fontSize: 9, fontWeight: '900', letterSpacing: 0.8 },

  // Loading
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  loadingCard: {
    backgroundColor: colors.bgElevated,
    borderWidth: 3,
    borderColor: colors.border,
    borderRadius: radius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.md,
    width: '100%',
    shadowColor: colors.shadow,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 5,
  },
  loadingIconWrap: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    backgroundColor: colors.primaryLight,
    borderWidth: 2.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingIcon: { fontSize: 26 },
  loadingTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: 2,
  },
  loadingText: { fontSize: 12, fontWeight: '600', color: colors.textMuted, textAlign: 'center' },

  // Error
  errorCard: {
    backgroundColor: '#FFF3F3',
    borderWidth: 3,
    borderColor: colors.danger,
    borderRadius: radius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.md,
    width: '100%',
    shadowColor: colors.danger,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 0,
    shadowOpacity: 0.2,
    elevation: 5,
  },
  errorEmoji: { fontSize: 32 },
  errorText: { fontSize: 13, fontWeight: '700', color: colors.danger, textAlign: 'center' },
  retryBtn: {
    backgroundColor: colors.primary,
    borderWidth: 2.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    shadowColor: colors.shadow,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 3,
  },
  retryBtnPressed: {
    transform: [{ translateX: 3 }, { translateY: 3 }],
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
  retryText: { fontSize: 12, fontWeight: '900', color: colors.textInverse, letterSpacing: 1 },

  // Tap hint
  tapHint: {
    backgroundColor: colors.bgElevated,
    borderTopWidth: 2.5,
    borderTopColor: colors.border,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  tapHintInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.yellowLight,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
  },
  tapHintIcon: { fontSize: 12 },
  tapHintText: {
    fontSize: 9,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: 1.5,
  },
});
