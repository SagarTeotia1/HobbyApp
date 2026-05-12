import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, radius } from '../../../../app/theme';
import { ROUTES } from '../../../../app/navigation/routes';

export const FLOATING_TAB_HEIGHT = 64;

const TAB_CONFIG: Record<string, { icon: string; label: string }> = {
  [ROUTES.DASHBOARD]: { icon: '⌂', label: 'HOME' },
  [ROUTES.ROADMAP]:   { icon: '◉', label: 'ROADMAP' },
};

export function FloatingTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.outerBar, { paddingBottom: insets.bottom }]}>
      {/* Top border line — full bleed */}
      <View style={styles.topBorder} />

      <View style={styles.buttonRow}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const cfg = TAB_CONFIG[route.name] ?? { icon: '●', label: route.name };
          const isLast = index === state.routes.length - 1;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              style={({ pressed }) => [
                styles.tabBtn,
                isFocused && styles.tabBtnActive,
                !isLast && styles.tabBtnBorderRight,
                pressed && !isFocused && styles.tabBtnPressed,
              ]}
            >
              {/* Neo-brutalist hard shadow layer behind button when active */}
              {isFocused && <View style={styles.btnShadow} />}

              <View style={[styles.btnInner, isFocused && styles.btnInnerActive]}>
                <Text style={[styles.icon, isFocused && styles.iconActive]}>
                  {cfg.icon}
                </Text>
                <Text style={[styles.label, isFocused && styles.labelActive]}>
                  {cfg.label}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerBar: {
    backgroundColor: colors.bg,
    borderTopWidth: 3,
    borderTopColor: colors.border,
  },
  topBorder: {
    // visual accent stripe
    height: 0,
  },
  buttonRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    gap: spacing.md,
  },
  tabBtn: {
    flex: 1,
    position: 'relative',
  },
  tabBtnBorderRight: {
    // separator handled by gap in buttonRow
  },
  tabBtnActive: {
    // handled by btnInner
  },
  tabBtnPressed: {
    opacity: 0.7,
  },
  btnShadow: {
    position: 'absolute',
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    backgroundColor: colors.border,
    borderRadius: radius.md,
    zIndex: 0,
  },
  btnInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    height: FLOATING_TAB_HEIGHT - spacing.sm * 2,
    borderWidth: 3,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.bgElevated,
    zIndex: 1,
  },
  btnInnerActive: {
    backgroundColor: colors.yellow,
    // translate up-left to create "pressed into shadow" effect when active
    transform: [{ translateX: -2 }, { translateY: -2 }],
  },
  icon: {
    fontSize: 18,
    color: colors.textMuted,
    lineHeight: 22,
  },
  iconActive: {
    color: colors.text,
  },
  label: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.textMuted,
    letterSpacing: 1.5,
  },
  labelActive: {
    color: colors.text,
  },
});
