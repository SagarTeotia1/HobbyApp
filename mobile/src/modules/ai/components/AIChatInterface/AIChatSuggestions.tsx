import React from 'react';
import { ScrollView, View } from 'react-native';
import { Chip } from '../../../../shared/components/ui/Chip/Chip';
import { spacing } from '../../../../app/theme';

export interface AIChatSuggestionsProps {
  suggestions: string[];
  onPick: (text: string) => void;
}

export function AIChatSuggestions({ suggestions, onPick }: AIChatSuggestionsProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={{ flexDirection: 'row', gap: spacing.sm }}>
        {suggestions.map((s) => (
          <Chip key={s} label={s} onPress={() => onPick(s)} />
        ))}
      </View>
    </ScrollView>
  );
}
