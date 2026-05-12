import React, { useState } from 'react';
import { Modal, View, Text, Pressable, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { CURRICULUM } from '../../constants/curriculum';
import { colors } from '../../../app/theme';
import { styles } from './ChangeHobbySheet.styles';

const FEATURED_IDS = ['chess', 'guitar', 'cooking', 'photography', 'yoga', 'web-dev'];

const FEATURED_HOBBIES = FEATURED_IDS.map((id) => {
  const h = CURRICULUM.find((c) => c.id === id)!;
  return { id: h.id, name: h.name, emoji: h.emoji, bg: h.accentColor };
});

function matchHobby(query: string): string {
  const q = query.trim().toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  if (!q) return query;
  const byId      = CURRICULUM.find((h) => h.id === q.replace(/\s+/g, '-'));
  if (byId) return byId.id;
  const byName    = CURRICULUM.find((h) => h.name.toLowerCase() === q);
  if (byName) return byName.id;
  const contains  = CURRICULUM.find((h) => h.name.toLowerCase().includes(q));
  if (contains) return contains.id;
  const words     = q.split(' ').filter(Boolean);
  const byWords   = CURRICULUM.find((h) =>
    words.some((w) => h.name.toLowerCase().includes(w) || h.id.includes(w)),
  );
  if (byWords) return byWords.id;
  return q.replace(/\s+/g, '-');
}

interface Props {
  visible: boolean;
  currentHobbyId: string;
  generating?: boolean;
  onSelect: (hobbyId: string) => void;
  onClose: () => void;
}

export function ChangeHobbySheet({ visible, currentHobbyId, generating = false, onSelect, onClose }: Props) {
  const [searchText, setSearchText] = useState('');
  const [focused, setFocused] = useState(false);

  const currentHobby = CURRICULUM.find((h) => h.id === currentHobbyId);

  function handleChipPress(hobbyId: string) {
    if (generating) return;
    onSelect(hobbyId);
    setSearchText('');
  }

  function handleSearch() {
    if (generating) return;
    const trimmed = searchText.trim();
    if (!trimmed) return;
    const matched = matchHobby(trimmed);
    onSelect(matched);
    setSearchText('');
  }

  function handleClose() {
    if (generating) return;
    setSearchText('');
    setFocused(false);
    onClose();
  }

  const canSearch = !!searchText.trim() && !generating;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <Pressable style={styles.overlay} onPress={handleClose}>
        <Pressable style={styles.sheet} onPress={() => {}}>
          <View style={styles.handle} />

          <View style={styles.sheetInner}>
            <Text style={styles.title}>Change Hobby</Text>
            <Text style={styles.subtitle}>Pick a new topic to master</Text>
          </View>

          {generating && (
            <View style={styles.generatingBanner}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={styles.generatingText}>Building your AI roadmap…</Text>
            </View>
          )}

          <ScrollView
            contentContainerStyle={styles.sheetInner}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">

            {/* Featured 3-col card grid */}
            <View style={styles.grid}>
              {FEATURED_HOBBIES.map((hobby) => {
                const isSelected = hobby.id === currentHobbyId;
                return (
                  <Pressable
                    key={hobby.id}
                    style={({ pressed }) => [
                      styles.card,
                      { backgroundColor: isSelected ? undefined : hobby.bg },
                      isSelected && styles.cardSelected,
                      !isSelected && pressed && styles.cardPressed,
                    ]}
                    onPress={() => handleChipPress(hobby.id)}>
                    {isSelected && (
                      <View style={styles.checkBadge}>
                        <Text style={styles.checkMark}>✓</Text>
                      </View>
                    )}
                    <Text style={styles.cardEmoji}>{hobby.emoji}</Text>
                    <Text
                      style={[styles.cardLabel, isSelected && styles.cardLabelSelected]}
                      numberOfLines={2}>
                      {hobby.name}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or type any hobby</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Search bar */}
            <View style={styles.searchWrapper}>
              <View style={[styles.searchRow, focused && styles.searchRowFocused]}>
                <Text style={styles.searchIcon}>🔍</Text>
                <TextInput
                  style={styles.searchInput}
                  value={searchText}
                  onChangeText={setSearchText}
                  placeholder="e.g. Piano, Poker, Baking, Yoga..."
                  placeholderTextColor={colors.textDim}
                  returnKeyType="search"
                  onSubmitEditing={handleSearch}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                />
                <Pressable
                  onPress={handleSearch}
                  disabled={!canSearch}
                  style={[styles.searchBtn, !canSearch && styles.searchBtnDisabled]}>
                  <Text style={[styles.searchArrow, !canSearch && styles.searchArrowDisabled]}>
                    →
                  </Text>
                </Pressable>
              </View>
              <Text style={styles.searchHint}>AI will find the best match for any hobby</Text>
            </View>

            {/* Current selection banner */}
            {currentHobby !== undefined && (
              <View style={styles.selectedBanner}>
                <Text style={styles.selectedEmoji}>{currentHobby.emoji}</Text>
                <Text style={styles.selectedName}>{currentHobby.name}</Text>
                <Text style={styles.selectedTag}>ACTIVE</Text>
              </View>
            )}

            <View style={styles.bottomSpacer} />
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
