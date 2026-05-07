import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Pressable, ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HobbyChip } from '../components/HobbyChip/HobbyChip';
import { HobbySearchBar } from '../components/HobbySearchBar/HobbySearchBar';
import { useOnboardingStore } from '../store/onboarding.store';
import { hobbySelectionStyles as styles } from './HobbySelectionScreen.styles';
import { colors } from '../../../app/theme';
import type { OnboardingStackParamList } from '../../../app/navigation/types';
import { ROUTES } from '../../../app/navigation/routes';

type Nav = NativeStackNavigationProp<OnboardingStackParamList, typeof ROUTES.ONBOARDING_HOBBY>;

// Vivid neo-brutal accent colors per hobby — intentionally bold
const PREDEFINED_HOBBIES = [
  { id: 'chess',   name: 'Chess',   emoji: '♟️', bg: colors.yellow },
  { id: 'guitar',  name: 'Guitar',  emoji: '🎸', bg: colors.coral },
  { id: 'drawing', name: 'Drawing', emoji: '🎨', bg: '#C4B5FD' },
  { id: 'coding',  name: 'Coding',  emoji: '💻', bg: '#93C5FD' },
  { id: 'cooking', name: 'Cooking', emoji: '🍳', bg: '#FDE68A' },
  { id: 'piano',   name: 'Piano',   emoji: '🎹', bg: '#A5B4FC' },
] as const;

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

  // On search submit: slug → store → navigate immediately. No suggestion step.
  const handleSearch = useCallback(
    (query: string) => {
      const slug = query
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      if (!slug) return;
      setHobby(slug);
      navigation.navigate(ROUTES.ONBOARDING_TIME, { hobbySlug: slug });
    },
    [setHobby, navigation],
  );

  const selectedPredefined = PREDEFINED_HOBBIES.find((h) => h.id === hobbySlug);
  const selectedLabel = selectedPredefined?.name ?? null;
  const selectedEmoji = selectedPredefined?.emoji ?? '🎯';

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.kavContainer}
        behavior="padding"
        keyboardVerticalOffset={0}>

        {/* Header — collapses when keyboard open */}
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

        {/* Scrollable body */}
        <ScrollView
          style={styles.scrollFlex}
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">

          {/* 3-column neo-brutal card grid */}
          <View style={styles.grid}>
            {PREDEFINED_HOBBIES.map((hobby) => (
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

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or search any hobby</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Search — submitting navigates directly to next step */}
          <HobbySearchBar
            onSearch={handleSearch}
            placeholder="e.g. Pottery, Surfing, Origami..."
          />

          {/* Selected banner (predefined chip only) */}
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

        {/* Footer CTA — inside KAV so it lifts with keyboard */}
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
