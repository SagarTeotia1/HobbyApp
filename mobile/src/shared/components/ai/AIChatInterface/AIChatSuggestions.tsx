import React from 'react';
import { ScrollView, View } from 'react-native';
import { Chip } from '../../ui/Chip/Chip';
import { aiChatStyles } from './AIChatInterface.styles';

export interface AIChatSuggestionsProps {
  suggestions: string[];
  onPick: (text: string) => void;
}

export function AIChatSuggestions({ suggestions, onPick }: AIChatSuggestionsProps) {
  if (suggestions.length === 0) return null;

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={aiChatStyles.suggestionsRow}>
        {suggestions.map((s) => (
          <Chip key={s} label={s} onPress={() => onPick(s)} />
        ))}
      </View>
    </ScrollView>
  );
}
