import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, spacing } from '../../../../app/theme';

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
        <Text style={styles.breakIcon}>☕</Text>
        <Text style={styles.breakBtnText}>BREAK</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.continueWrap, pressed && styles.continueWrapPressed]}
        onPress={onContinue}>
        <View style={styles.continueShadow} />
        <View style={styles.continueFace}>
          <Text style={styles.continueBtnText}>
            {isLast ? 'NEXT TOPIC' : 'NEXT VIDEO'}
          </Text>
          <Text style={styles.continueArrow}>{isLast ? '→→' : '▶'}</Text>
        </View>
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
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    backgroundColor: colors.bg,
    borderTopWidth: 3,
    borderTopColor: colors.border,
    alignItems: 'center',
  },

  breakBtn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    borderWidth: 2.5,
    borderColor: colors.border,
    borderRadius: 6,
    backgroundColor: colors.bgElevated,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 3,
    minWidth: 64,
  },
  breakBtnPressed: {
    transform: [{ translateX: 3 }, { translateY: 3 }],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  breakIcon: { fontSize: 16 },
  breakBtnText: {
    fontSize: 8,
    fontWeight: '900',
    color: colors.textMuted,
    letterSpacing: 1,
  },

  continueWrap: {
    flex: 1,
    position: 'relative',
  },
  continueWrapPressed: {},
  continueShadow: {
    position: 'absolute',
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    backgroundColor: colors.border,
    borderRadius: 6,
  },
  continueFace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primary,
    borderWidth: 2.5,
    borderColor: colors.border,
    borderRadius: 6,
    paddingVertical: spacing.md,
    zIndex: 1,
  },
  continueBtnText: {
    fontSize: 13,
    fontWeight: '900',
    color: colors.textInverse,
    letterSpacing: 1.5,
  },
  continueArrow: {
    fontSize: 14,
    color: colors.yellow,
    fontWeight: '900',
  },
});
