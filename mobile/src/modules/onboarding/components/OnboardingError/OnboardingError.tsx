import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

interface Props {
  message: string;
  onRetry: () => void;
  onBack: () => void;
}

export function OnboardingError({ message, onRetry, onBack }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>⚠️</Text>
      <Text style={styles.title}>Something went wrong</Text>
      <Text style={styles.msg}>{message}</Text>

      <Pressable
        style={({ pressed }) => [styles.retryBtn, pressed && styles.retryBtnPressed]}
        onPress={onRetry}>
        <Text style={styles.retryBtnText}>Try Again</Text>
      </Pressable>

      <Pressable style={styles.backBtn} onPress={onBack}>
        <Text style={styles.backBtnText}>← Go Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  icon: { fontSize: 56 },
  title: { fontSize: 24, fontWeight: '900', color: colors.text, letterSpacing: -0.5 },
  msg: { fontSize: 14, fontWeight: '500', color: colors.textMuted, textAlign: 'center', lineHeight: 22 },
  retryBtn: {
    marginTop: spacing.sm,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 4,
    width: '100%',
    alignItems: 'center',
  },
  retryBtnPressed: {
    transform: [{ translateX: 4 }, { translateY: 4 }],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  retryBtnText: { fontSize: 16, fontWeight: '900', color: colors.textInverse },
  backBtn: { paddingVertical: spacing.sm },
  backBtnText: { fontSize: 14, fontWeight: '700', color: colors.textDim },
});
