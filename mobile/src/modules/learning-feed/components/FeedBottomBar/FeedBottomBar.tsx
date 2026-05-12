import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

interface Props {
  isLast: boolean;
  paddingBottom: number;
  onBreak: () => void;
  onContinue: () => void;
}

export function FeedBottomBar({ isLast, paddingBottom, onBreak, onContinue }: Props) {
  return (
    <View style={[styles.bar, { paddingBottom }]}>
      <Pressable
        style={({ pressed }) => [styles.breakBtn, pressed && styles.breakBtnPressed]}
        onPress={onBreak}>
        <Text style={styles.breakBtnText}>☕ Need Break</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [styles.continueBtn, pressed && styles.continueBtnPressed]}
        onPress={onContinue}>
        <Text style={styles.continueBtnText}>
          {isLast ? 'Next Topic →' : '▶ Next Video'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    backgroundColor: colors.bg,
    borderTopWidth: 2,
    borderTopColor: colors.border,
  },
  breakBtn: {
    flex: 1,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.bgElevated,
    paddingVertical: spacing.md,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 3,
  },
  breakBtnPressed: {
    transform: [{ translateX: 3 }, { translateY: 3 }],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  breakBtnText: { fontSize: 13, fontWeight: '800', color: colors.textMuted },
  continueBtn: {
    flex: 2,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 3,
  },
  continueBtnPressed: {
    transform: [{ translateX: 3 }, { translateY: 3 }],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  continueBtnText: { fontSize: 13, fontWeight: '900', color: colors.textInverse },
});
