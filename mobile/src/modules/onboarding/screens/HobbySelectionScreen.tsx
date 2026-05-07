import React, { useCallback } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../../shared/components/ui/Typography/Typography';
import { Button } from '../../../shared/components/ui/Button/Button';
import { HobbyChip } from '../components/HobbyChip/HobbyChip';
import { HobbySearchBar } from '../components/HobbySearchBar/HobbySearchBar';
import { useOnboardingStore } from '../store/onboarding.store';
import { useHobbySearch } from '../hooks/useHobbySearch';
import { hobbySelectionStyles as styles } from './HobbySelectionScreen.styles';
import type { OnboardingStackParamList } from '../../../app/navigation/types';
import { ROUTES } from '../../../app/navigation/routes';
import { colors } from '../../../app/theme';

type Nav = NativeStackNavigationProp<OnboardingStackParamList, typeof ROUTES.ONBOARDING_HOBBY>;

const PREDEFINED_HOBBIES = [
  { id: 'chess', name: 'Chess', emoji: '♟️' },
  { id: 'guitar', name: 'Guitar', emoji: '🎸' },
  { id: 'drawing', name: 'Drawing', emoji: '🎨' },
  { id: 'coding', name: 'Coding', emoji: '💻' },
  { id: 'photography', name: 'Photography', emoji: '📷' },
  { id: 'cooking', name: 'Cooking', emoji: '🍳' },
  { id: 'yoga', name: 'Yoga', emoji: '🧘' },
  { id: 'writing', name: 'Writing', emoji: '✍️' },
  { id: 'piano', name: 'Piano', emoji: '🎹' },
  { id: 'running', name: 'Running', emoji: '🏃' },
];

export function HobbySelectionScreen() {
  const navigation = useNavigation<Nav>();
  const hobbySlug = useOnboardingStore((s) => s.hobbySlug);
  const setHobby = useOnboardingStore((s) => s.setHobby);

  const { suggestions, isSearching, search, clear } = useHobbySearch();

  const handleSearch = useCallback(
    (query: string) => {
      const slug = query
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      if (slug) setHobby(slug);
      void search(query);
    },
    [search, setHobby],
  );

  const handleSuggestionSelect = useCallback(
    (slug: string) => { setHobby(slug); clear(); },
    [setHobby, clear],
  );

  const selectedLabel = hobbySlug
    ? (PREDEFINED_HOBBIES.find((h) => h.id === hobbySlug)?.name ??
       suggestions.find((s) => s.slug === hobbySlug)?.name ??
       hobbySlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()))
    : null;

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">

        {/* Header */}
        <View style={styles.header}>
          <Typography variant="title">Pick Your Hobby</Typography>
          <Typography variant="body" muted>
            Choose from the list or search any hobby below.
          </Typography>
        </View>

        {/* Predefined hobby chips */}
        <View style={styles.grid}>
          {PREDEFINED_HOBBIES.map((h) => (
            <HobbyChip
              key={h.id}
              label={h.name}
              emoji={h.emoji}
              selected={hobbySlug === h.id}
              onPress={() => { setHobby(h.id); clear(); }}
            />
          ))}
        </View>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Typography variant="caption" muted>or search your own</Typography>
          <View style={styles.dividerLine} />
        </View>

        {/* AI search input */}
        <HobbySearchBar onSearch={handleSearch} isSearching={isSearching} />

        {/* AI-suggested hobby chips */}
        {suggestions.length > 0 ? (
          <View style={styles.aiSection}>
            <Typography variant="caption" muted>AI found these — tap to select:</Typography>
            <View style={styles.suggestionsRow}>
              {suggestions.map((s) => (
                <HobbyChip
                  key={s.slug}
                  label={s.name}
                  selected={hobbySlug === s.slug}
                  onPress={() => handleSuggestionSelect(s.slug)}
                />
              ))}
            </View>
          </View>
        ) : null}

        {/* Selected hobby banner */}
        {selectedLabel ? (
          <View style={styles.selectedBanner}>
            <Typography variant="body" style={styles.selectedBannerText}>
              ✓  {selectedLabel}
            </Typography>
            <Pressable onPress={() => { setHobby(''); clear(); }}>
              <Typography variant="caption" color={colors.surface}>Change</Typography>
            </Pressable>
          </View>
        ) : null}

      </ScrollView>

      <View style={styles.footer}>
        <Button
          label={selectedLabel ? `Continue with ${selectedLabel}` : 'Pick a hobby to continue'}
          disabled={!hobbySlug}
          onPress={() =>
            navigation.navigate(ROUTES.ONBOARDING_TIME, { hobbySlug: hobbySlug ?? '' })
          }
        />
      </View>
    </SafeAreaView>
  );
}
