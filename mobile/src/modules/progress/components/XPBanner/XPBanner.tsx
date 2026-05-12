import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

interface Props {
  xpEarned: number;
}

export function XPBanner({ xpEarned }: Props) {
  return (
    <View style={styles.banner}>
      <Text style={styles.label}>XP EARNED THIS SESSION</Text>
      <Text style={styles.value}>+{xpEarned}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.yellow,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 4,
    gap: 4,
  },
  label: { fontSize: 10, fontWeight: '800', color: colors.text, letterSpacing: 1.5, textTransform: 'uppercase', opacity: 0.7 },
  value: { fontSize: 42, fontWeight: '900', color: colors.text, letterSpacing: -1 },
});
