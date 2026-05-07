import React, { useState } from 'react';
import { View, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { Typography } from '../../../../shared/components/ui/Typography/Typography';
import { hobbySearchBarStyles as styles } from './HobbySearchBar.styles';
import { colors } from '../../../../app/theme';

export interface HobbySearchBarProps {
  onSearch: (query: string) => void;
  isSearching?: boolean;
  placeholder?: string;
}

export function HobbySearchBar({ onSearch, isSearching = false, placeholder }: HobbySearchBarProps) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed || isSearching) return;
    onSearch(trimmed);
    setText('');
  };

  return (
    <View>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder={placeholder ?? 'e.g. Piano, Pottery, Surfing...'}
          placeholderTextColor={colors.textDim}
          returnKeyType="search"
          onSubmitEditing={handleSubmit}
        />
        <Pressable
          onPress={handleSubmit}
          disabled={!text.trim() || isSearching}
          style={[styles.sendBtn, (!text.trim() || isSearching) && styles.sendBtnDisabled]}>
          {isSearching ? (
            <ActivityIndicator size="small" color={colors.bg} />
          ) : (
            <Typography variant="caption" color={colors.bg}>→</Typography>
          )}
        </Pressable>
      </View>
      <Typography variant="caption" muted style={styles.hint}>
        AI will find the best match for you
      </Typography>
    </View>
  );
}
