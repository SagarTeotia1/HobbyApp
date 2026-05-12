import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

interface StatItem {
  value: string | number;
  label: string;
  icon: string;
  accent: string;
}

interface Props {
  stats: StatItem[];
}

// Each card gets its own shape decoration
const SHAPES = [
  { size: 52, rotation: '18deg', top: -18, right: -14 },
  { size: 44, rotation: '-12deg', top: -14, right: -10 },
  { size: 56, rotation: '22deg', top: -20, right: -16 },
  { size: 40, rotation: '-8deg',  top: -12, right: -8  },
];

export function StatsGrid({ stats }: Props) {
  return (
    <View style={styles.grid}>
      {stats.map((s, i) => {
        const shape = SHAPES[i % SHAPES.length];
        return (
          <View key={s.label} style={[styles.card, { backgroundColor: s.accent }]}>
            {/* Decorative corner shape */}
            <View
              style={[
                styles.cornerShape,
                {
                  width: shape.size,
                  height: shape.size,
                  top: shape.top,
                  right: shape.right,
                  transform: [{ rotate: shape.rotation }],
                  borderRadius: i % 2 === 0 ? 6 : shape.size / 2,
                },
              ]}
            />
            <Text style={styles.icon}>{s.icon}</Text>
            <Text style={styles.value}>{s.value}</Text>
            <Text style={styles.label}>{s.label}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  card: {
    flex: 1,
    minWidth: '45%',
    borderWidth: 3,
    borderColor: colors.border,
    borderRadius: radius.xl,
    padding: spacing.lg,
    shadowColor: colors.shadow,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 5,
    gap: spacing.xxs,
    overflow: 'hidden',
    position: 'relative',
  },
  cornerShape: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.08)',
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  icon: {
    fontSize: 20,
    zIndex: 1,
  },
  value: {
    fontSize: 30,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -1,
    zIndex: 1,
  },
  label: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    zIndex: 1,
  },
});
