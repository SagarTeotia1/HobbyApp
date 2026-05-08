import React, { useMemo } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import Svg, { G, Rect, Text as SvgText, Path } from 'react-native-svg';
import { colors } from '../../../../app/theme';
import type { GraphNode, GraphEdge, GraphNodeType } from '../../types/roadmap.types';
import { styles } from './LearnGraph.styles';

const NODE_W   = 120;
const NODE_H   = 52;
const NODE_R   = 8;
const H_GAP    = 24;
const V_GAP    = 68;
const PADDING  = 28;
const SCREEN_W = Dimensions.get('window').width;

const NODE_FILL: Record<GraphNodeType, string> = {
  root:    colors.primary,
  concept: colors.yellow,
  detail:  colors.blue,
  example: colors.mint,
};

const NODE_TEXT: Record<GraphNodeType, string> = {
  root:    colors.textInverse,
  concept: colors.text,
  detail:  colors.textInverse,
  example: colors.textInverse,
};

function computeLayout(nodes: GraphNode[], edges: GraphEdge[]) {
  const parentCount = new Map<string, number>();
  const childMap    = new Map<string, string[]>();

  nodes.forEach(n => { parentCount.set(n.id, 0); childMap.set(n.id, []); });
  edges.forEach(e => {
    childMap.get(e.from)?.push(e.to);
    parentCount.set(e.to, (parentCount.get(e.to) ?? 0) + 1);
  });

  const levels  = new Map<string, number>();
  const roots   = nodes.filter(n => (parentCount.get(n.id) ?? 0) === 0);
  roots.forEach(r => levels.set(r.id, 0));

  const queue = [...roots];
  while (queue.length > 0) {
    const node = queue.shift()!;
    const level = levels.get(node.id) ?? 0;
    for (const childId of childMap.get(node.id) ?? []) {
      if (!levels.has(childId)) {
        levels.set(childId, level + 1);
        const child = nodes.find(n => n.id === childId);
        if (child) queue.push(child);
      }
    }
  }

  const byLevel = new Map<number, string[]>();
  levels.forEach((lvl, id) => {
    if (!byLevel.has(lvl)) byLevel.set(lvl, []);
    byLevel.get(lvl)!.push(id);
  });

  let maxRowWidth = 0;
  byLevel.forEach(ids => {
    const w = ids.length * NODE_W + (ids.length - 1) * H_GAP;
    if (w > maxRowWidth) maxRowWidth = w;
  });

  const canvasWidth = Math.max(maxRowWidth + PADDING * 2, SCREEN_W);
  const positions   = new Map<string, { x: number; y: number }>();

  byLevel.forEach((ids, lvl) => {
    const rowW   = ids.length * NODE_W + (ids.length - 1) * H_GAP;
    const startX = (canvasWidth - rowW) / 2;
    ids.forEach((id, i) => {
      positions.set(id, {
        x: startX + i * (NODE_W + H_GAP),
        y: PADDING + lvl * (NODE_H + V_GAP),
      });
    });
  });

  const maxLevel    = byLevel.size > 0 ? Math.max(...Array.from(byLevel.keys())) : 0;
  const canvasHeight = PADDING * 2 + (maxLevel + 1) * NODE_H + maxLevel * V_GAP;

  return { positions, canvasWidth, canvasHeight };
}

interface Props {
  nodes: GraphNode[];
  edges: GraphEdge[];
  selectedId: string | null;
  onNodePress: (node: GraphNode) => void;
}

export function LearnGraph({ nodes, edges, selectedId, onNodePress }: Props) {
  const { positions, canvasWidth, canvasHeight } = useMemo(
    () => computeLayout(nodes, edges),
    [nodes, edges],
  );

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ width: canvasWidth, height: canvasHeight }}>
          <Svg width={canvasWidth} height={canvasHeight}>
            {/* Edges */}
            {edges.map((edge, i) => {
              const from = positions.get(edge.from);
              const to   = positions.get(edge.to);
              if (!from || !to) return null;
              const x1 = from.x + NODE_W / 2;
              const y1 = from.y + NODE_H;
              const x2 = to.x   + NODE_W / 2;
              const y2 = to.y;
              const midY = (y1 + y2) / 2;
              return (
                <Path
                  key={`edge-${i}`}
                  d={`M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`}
                  stroke={colors.borderLight}
                  strokeWidth={2}
                  fill="none"
                />
              );
            })}

            {/* Nodes */}
            {nodes.map(node => {
              const pos = positions.get(node.id);
              if (!pos) return null;
              const isSelected = node.id === selectedId;
              const fill       = isSelected ? colors.yellow       : NODE_FILL[node.type] ?? colors.surface;
              const textColor  = isSelected ? colors.text         : NODE_TEXT[node.type] ?? colors.text;
              const truncated  = node.label.length > 14 ? node.label.slice(0, 13) + '…' : node.label;

              return (
                <G key={node.id} onPress={() => onNodePress(node)}>
                  {/* Hard shadow */}
                  <Rect
                    x={pos.x + 3}
                    y={pos.y + 3}
                    width={NODE_W}
                    height={NODE_H}
                    rx={NODE_R}
                    fill={colors.border}
                  />
                  {/* Card */}
                  <Rect
                    x={pos.x}
                    y={pos.y}
                    width={NODE_W}
                    height={NODE_H}
                    rx={NODE_R}
                    fill={fill}
                    stroke={isSelected ? colors.border : colors.border}
                    strokeWidth={2}
                  />
                  {/* Type badge dot */}
                  <Rect
                    x={pos.x + 8}
                    y={pos.y + 8}
                    width={6}
                    height={6}
                    rx={3}
                    fill={textColor}
                    opacity={0.5}
                  />
                  {/* Label */}
                  <SvgText
                    x={pos.x + NODE_W / 2}
                    y={pos.y + NODE_H / 2 + 5}
                    textAnchor="middle"
                    fill={textColor}
                    fontSize={11}
                    fontWeight="700">
                    {truncated}
                  </SvgText>
                </G>
              );
            })}
          </Svg>
        </ScrollView>
      </ScrollView>
    </View>
  );
}
