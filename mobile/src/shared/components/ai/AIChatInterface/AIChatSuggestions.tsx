import React from 'react';
import { ScrollView, Pressable, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '@app/theme';

interface Props {
  suggestions: string[];
  onPick: (text: string) => void;
}

export function AIChatSuggestions({ suggestions, onPick }: Props) {
  if (suggestions.length === 0) return null;
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {suggestions.map((s) => (
        <Pressable key={s} style={styles.chip} onPress={() => onPick(s)}>
          <Text style={styles.chipText}>{s}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { gap: spacing.sm, paddingVertical: spacing.xs },
  chip: {
    backgroundColor: colors.bgElevated,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  chipText: { fontSize: 13, color: colors.text, fontWeight: '600' },
});
