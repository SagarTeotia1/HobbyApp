import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Pressable, ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HobbyChip } from '../components/HobbyChip/HobbyChip';
import { HobbySearchBar } from '../components/HobbySearchBar/HobbySearchBar';
import { useOnboardingStore } from '../store/onboarding.store';
import { hobbySelectionStyles as styles } from './HobbySelectionScreen.styles';
import { CURRICULUM } from '../../../shared/constants/curriculum';
import type { OnboardingStackParamList } from '../../../app/navigation/types';
import { ROUTES } from '../../../app/navigation/routes';

type Nav = NativeStackNavigationProp<OnboardingStackParamList, typeof ROUTES.ONBOARDING_HOBBY>;

const FEATURED_IDS = ['chess', 'guitar', 'cooking', 'photography', 'yoga', 'web-dev'];

const FEATURED_HOBBIES = FEATURED_IDS.map((id) => {
  const h = CURRICULUM.find((c) => c.id === id)!;
  return { id: h.id, name: h.name, emoji: h.emoji, bg: h.accentColor };
});

function matchHobbyInCurriculum(query: string): string {
  const q = query.trim().toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  if (!q) return query;

  // 1. exact id match
  const byId = CURRICULUM.find((h) => h.id === q.replace(/\s+/g, '-'));
  if (byId) return byId.id;

  // 2. exact name match
  const byName = CURRICULUM.find((h) => h.name.toLowerCase() === q);
  if (byName) return byName.id;

  // 3. curriculum name contains query
  const nameContains = CURRICULUM.find((h) => h.name.toLowerCase().includes(q));
  if (nameContains) return nameContains.id;

  // 4. query contains curriculum name
  const queryContains = CURRICULUM.find((h) => q.includes(h.name.toLowerCase()));
  if (queryContains) return queryContains.id;

  // 5. word-level overlap
  const words = q.split(' ').filter(Boolean);
  const byWords = CURRICULUM.find((h) =>
    words.some((w) => h.name.toLowerCase().includes(w) || h.id.includes(w)),
  );
  if (byWords) return byWords.id;

  // no match — return slugified query (unmapped custom hobby)
  return q.replace(/\s+/g, '-');
}

export function HobbySelectionScreen() {
  const navigation = useNavigation<Nav>();
  const hobbySlug = useOnboardingStore((s) => s.hobbySlug);
  const setHobby = useOnboardingStore((s) => s.setHobby);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => { show.remove(); hide.remove(); };
  }, []);

  const handleSearch = useCallback(
    (query: string) => {
      const matched = matchHobbyInCurriculum(query);
      setHobby(matched);
      navigation.navigate(ROUTES.ONBOARDING_TIME, { hobbySlug: matched });
    },
    [setHobby, navigation],
  );

  const selectedFeatured = FEATURED_HOBBIES.find((h) => h.id === hobbySlug);
  const selectedCurriculum = !selectedFeatured
    ? CURRICULUM.find((h) => h.id === hobbySlug)
    : null;
  const selectedLabel = selectedFeatured?.name ?? selectedCurriculum?.name ?? null;
  const selectedEmoji = selectedFeatured?.emoji ?? selectedCurriculum?.emoji ?? '🎯';

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.kavContainer}
        behavior="padding"
        keyboardVerticalOffset={0}>

        <View style={[styles.header, keyboardVisible && styles.headerCompact]}>
          <View style={styles.stepRow}>
            <Text style={styles.stepLabel}>Step 1 of 3</Text>
            <View style={styles.stepDots}>
              <View style={styles.dotActive} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </View>

          {!keyboardVisible && (
            <View style={styles.headlineBlock}>
              <Text style={styles.headline}>
                {'Pick Your\n'}
                <Text style={styles.headlineAccent}>Hobby.</Text>
              </Text>
              <Text style={styles.subHeadline}>
                AI builds a personal learning plan just for you.
              </Text>
            </View>
          )}
        </View>

        <ScrollView
          style={styles.scrollFlex}
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">

          {/* 6 featured chips */}
          <View style={styles.grid}>
            {FEATURED_HOBBIES.map((hobby) => (
              <HobbyChip
                key={hobby.id}
                variant="card"
                label={hobby.name}
                emoji={hobby.emoji}
                tileBg={hobby.bg}
                selected={hobbySlug === hobby.id}
                onPress={() => setHobby(hobby.id)}
              />
            ))}
          </View>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or type any hobby</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* AI search — auto-maps to curriculum */}
          <HobbySearchBar
            onSearch={handleSearch}
            placeholder="e.g. Piano, Poker, Baking, Yoga..."
          />

          {selectedLabel ? (
            <View style={styles.selectedBanner}>
              <View style={styles.selectedBannerLeft}>
                <Text style={styles.selectedBannerEmoji}>{selectedEmoji}</Text>
                <Text style={styles.selectedBannerText}>{selectedLabel}</Text>
              </View>
              <Pressable onPress={() => setHobby('')}>
                <Text style={styles.selectedBannerChange}>Change</Text>
              </Pressable>
            </View>
          ) : null}

        </ScrollView>

        <View style={[styles.footer, keyboardVisible && styles.footerKeyboard]}>
          <Pressable
            disabled={!hobbySlug}
            style={({ pressed }) => [
              styles.ctaButton,
              !hobbySlug && styles.ctaButtonDisabled,
              pressed && !!hobbySlug && styles.ctaButtonPressed,
            ]}
            onPress={() =>
              navigation.navigate(ROUTES.ONBOARDING_TIME, { hobbySlug: hobbySlug ?? '' })
            }>
            <Text style={[styles.ctaText, !hobbySlug && styles.ctaTextDisabled]}>
              {selectedLabel ? `Continue with ${selectedLabel}  →` : 'Pick a hobby to continue'}
            </Text>
          </Pressable>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
