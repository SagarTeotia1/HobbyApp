import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../app/theme';

export function CardSkeleton() {
  return (
    <View style={styles.root}>
      <View style={[styles.line, { width: '40%' }]} />
      <View style={[styles.line, { width: '85%' }]} />
      <View style={[styles.line, { width: '70%' }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.surface,
    padding: spacing.xl,
    borderRadius: radius.xl,
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  line: {
    height: 16,
    backgroundColor: colors.bgElevated,
    borderRadius: radius.sm,
  },
});
