import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../../../../app/theme';

interface Props {
  xpEarned: number;
}

export function XPBanner({ xpEarned }: Props) {
  return (
    <View style={styles.banner}>
      <Text style={styles.label}>XP EARNED</Text>
      <View style={styles.valueRow}>
        <Text style={styles.plus}>+</Text>
        <Text style={styles.value}>{xpEarned}</Text>
        <Text style={styles.xpTag}>XP</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    borderWidth: 2.5,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.yellow,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: colors.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 4,
  },
  label: { fontSize: 12, fontWeight: '900', color: colors.text, letterSpacing: 2 },
  valueRow: { flexDirection: 'row', alignItems: 'baseline', gap: 2 },
  plus: { fontSize: 22, fontWeight: '900', color: colors.text },
  value: { fontSize: 44, fontWeight: '900', color: colors.text, letterSpacing: -1 },
  xpTag: { fontSize: 14, fontWeight: '900', color: 'rgba(0,0,0,0.5)', marginLeft: 4 },
});
