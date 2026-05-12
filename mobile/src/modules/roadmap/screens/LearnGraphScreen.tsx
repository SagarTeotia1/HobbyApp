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

const TYPE_COLORS: Record<string, string> = {
  root: colors.primary,
  concept: colors.yellow,
  detail: colors.blue,
  example: colors.mint,
};

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

      {graph !== null && (
        <View style={styles.legend}>
          {(['root', 'concept', 'detail', 'example'] as const).map((type) => (
            <View key={type} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: TYPE_COLORS[type] }]} />
              <Text style={styles.legendLabel}>{type}</Text>
            </View>
          ))}
        </View>
      )}

      {isLoading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Generating knowledge graph…</Text>
        </View>
      )}

      {error !== null && (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable style={styles.retryBtn} onPress={handleRetry}>
            <Text style={styles.retryText}>Retry</Text>
          </Pressable>
        </View>
      )}

      {graph !== null && !isLoading && (
        <LearnGraph
          nodes={graph.nodes}
          edges={graph.edges}
          selectedId={selectedNode?.id ?? null}
          onNodePress={(node) => setSelectedNode((prev) => (prev?.id === node.id ? null : node))}
        />
      )}

      {selectedNode !== null && (
        <GraphNodePanel node={selectedNode} onClose={() => setSelectedNode(null)} />
      )}

      {graph !== null && selectedNode === null && (
        <View style={styles.tapHint}>
          <Text style={styles.tapHintText}>Tap any node to see its description</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  legend: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    backgroundColor: colors.bgElevated,
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legendDot: { width: 10, height: 10, borderRadius: 5, borderWidth: 1, borderColor: colors.border },
  legendLabel: { fontSize: 10, fontWeight: '700', color: colors.textMuted, textTransform: 'uppercase' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md },
  loadingText: { fontSize: 14, fontWeight: '600', color: colors.textMuted },
  errorText: { fontSize: 14, fontWeight: '600', color: colors.danger, textAlign: 'center' },
  retryBtn: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.bgElevated,
  },
  retryText: { fontWeight: '800', color: colors.text },
  tapHint: {
    paddingVertical: spacing.sm,
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  tapHintText: { fontSize: 12, fontWeight: '600', color: colors.textDim },
});
