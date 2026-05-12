import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../../../../app/theme';

export function SessionHero() {
  return (
    <View style={styles.hero}>
      <Text style={styles.emoji}>🎉</Text>
      <Text style={styles.title}>Session Complete!</Text>
      <Text style={styles.sub}>Keep the momentum going</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', paddingVertical: spacing.lg, gap: spacing.xs },
  emoji: { fontSize: 52 },
  title: { fontSize: 30, fontWeight: '900', color: colors.text, letterSpacing: -0.5 },
  sub: { fontSize: 14, fontWeight: '600', color: colors.textMuted },
});
