import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { colors, spacing, radius } from '../../../app/theme';
import { ROUTES } from '../../../app/navigation/routes';
import type { AppStackParamList } from '../../../app/navigation/types';
import { useLearnGraph } from '../hooks/useLearnGraph';
import { LearnGraph } from '../components/LearnGraph';
import type { GraphNode } from '../types/roadmap.types';

type Nav   = NativeStackNavigationProp<AppStackParamList, typeof ROUTES.LEARN_GRAPH>;
type Route = RouteProp<AppStackParamList, typeof ROUTES.LEARN_GRAPH>;

const TYPE_COLORS: Record<string, string> = {
  root:    colors.primary,
  concept: colors.yellow,
  detail:  colors.blue,
  example: colors.mint,
};

export function LearnGraphScreen() {
  const navigation = useNavigation<Nav>();
  const { params } = useRoute<Route>();
  const { graph, isLoading, error, fetch } = useLearnGraph();
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);

  useEffect(() => {
    void fetch({
      hobbyId:   params.hobbyId,
      topicId:   params.topicId,
      topicName: params.topicName,
      hobbyName: params.hobbyName,
    });
  }, []);

  function handleNodePress(node: GraphNode) {
    setSelectedNode(prev => (prev?.id === node.id ? null : node));
  }

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [styles.backBtn, pressed && styles.backBtnPressed]}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {params.topicName}
        </Text>
        <View style={styles.headerRight} />
      </View>

      {/* Legend */}
      {graph !== null && (
        <View style={styles.legend}>
          {(['root', 'concept', 'detail', 'example'] as const).map(type => (
            <View key={type} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: TYPE_COLORS[type] }]} />
              <Text style={styles.legendLabel}>{type}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Loading */}
      {isLoading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Generating knowledge graph…</Text>
        </View>
      )}

      {/* Error */}
      {error !== null && (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable
            style={styles.retryBtn}
            onPress={() => void fetch({
              hobbyId: params.hobbyId, topicId: params.topicId,
              topicName: params.topicName, hobbyName: params.hobbyName,
            })}>
            <Text style={styles.retryText}>Retry</Text>
          </Pressable>
        </View>
      )}

      {/* Graph */}
      {graph !== null && !isLoading && (
        <LearnGraph
          nodes={graph.nodes}
          edges={graph.edges}
          selectedId={selectedNode?.id ?? null}
          onNodePress={handleNodePress}
        />
      )}

      {/* Selected node panel */}
      {selectedNode !== null && (
        <View style={styles.nodePanel}>
          <View style={[styles.nodePanelAccent, { backgroundColor: TYPE_COLORS[selectedNode.type] }]} />
          <View style={styles.nodePanelContent}>
            <View style={styles.nodePanelHeader}>
              <Text style={styles.nodePanelType}>{selectedNode.type.toUpperCase()}</Text>
              <Pressable onPress={() => setSelectedNode(null)}>
                <Text style={styles.nodePanelClose}>✕</Text>
              </Pressable>
            </View>
            <Text style={styles.nodePanelTitle}>{selectedNode.label}</Text>
            <Text style={styles.nodePanelDesc}>{selectedNode.description}</Text>
          </View>
        </View>
      )}

      {/* Tap hint */}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
    backgroundColor: colors.bgElevated,
  },
  backBtn: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colors.bg,
    shadowColor: colors.shadow,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 2,
  },
  backBtnPressed: {
    transform: [{ translateX: 2 }, { translateY: 2 }],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  backText: { fontSize: 13, fontWeight: '800', color: colors.text },
  headerTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '900',
    color: colors.text,
    textAlign: 'center',
    marginHorizontal: spacing.sm,
  },
  headerRight: { width: 60 },
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
  nodePanel: {
    borderTopWidth: 3,
    borderTopColor: colors.border,
    backgroundColor: colors.bgElevated,
    flexDirection: 'row',
    maxHeight: 160,
  },
  nodePanelAccent: { width: 6 },
  nodePanelContent: { flex: 1, padding: spacing.md },
  nodePanelHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xs },
  nodePanelType: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
    color: colors.textDim,
  },
  nodePanelClose: { fontSize: 14, color: colors.textDim, fontWeight: '700' },
  nodePanelTitle: { fontSize: 16, fontWeight: '900', color: colors.text, marginBottom: spacing.xs },
  nodePanelDesc: { fontSize: 13, fontWeight: '500', color: colors.textMuted, lineHeight: 19 },
  tapHint: {
    paddingVertical: spacing.sm,
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  tapHintText: { fontSize: 12, fontWeight: '600', color: colors.textDim },
});
