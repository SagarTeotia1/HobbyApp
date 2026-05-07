import React, { useState } from 'react';
import { ActivityIndicator, Pressable, Text, TextInput, View } from 'react-native';
import { hobbySearchBarStyles as styles } from './HobbySearchBar.styles';
import { colors } from '../../../../app/theme';

export interface HobbySearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  isSearching?: boolean;
}

export function HobbySearchBar({ onSearch, isSearching = false, placeholder }: HobbySearchBarProps) {
  const [text, setText] = useState('');
  const [focused, setFocused] = useState(false);

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed || isSearching) return;
    onSearch(trimmed);
    setText('');
  };

  const canSubmit = !!text.trim() && !isSearching;

  return (
    <View style={styles.wrapper}>
      <View style={[styles.inputRow, focused && styles.inputRowFocused]}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder={placeholder ?? 'e.g. Piano, Pottery, Surfing...'}
          placeholderTextColor={colors.textDim}
          returnKeyType="search"
          onSubmitEditing={handleSubmit}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <Pressable
          onPress={handleSubmit}
          disabled={!canSubmit}
          style={[styles.sendBtn, !canSubmit && styles.sendBtnDisabled]}>
          {isSearching ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <Text style={[styles.sendArrow, !canSubmit && styles.sendArrowDisabled]}>→</Text>
          )}
        </Pressable>
      </View>
      <Text style={styles.hint}>AI will find the best match for any hobby you type</Text>
    </View>
  );
}
