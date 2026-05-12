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
import { matchHobbyInCurriculum } from '../../../shared/utils/hobbySearch';
import type { OnboardingStackParamList } from '../../../app/navigation/types';
import { ROUTES } from '../../../app/navigation/routes';

type Nav = NativeStackNavigationProp<OnboardingStackParamList, typeof ROUTES.ONBOARDING_HOBBY>;

const FEATURED_IDS = ['chess', 'guitar', 'cooking', 'photography', 'yoga', 'web-dev'];

const FEATURED_HOBBIES = FEATURED_IDS.map((id) => {
  const h = CURRICULUM.find((c) => c.id === id)!;
  return { id: h.id, name: h.name, emoji: h.emoji, bg: h.accentColor };
});


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
