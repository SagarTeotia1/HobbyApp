import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

interface Props {
  hobbyName: string;
  onPress: () => void;
}

export function ComicTeaser({ hobbyName, onPress }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}>
      <Text style={styles.icon}>🎨</Text>
      <View style={styles.body}>
        <Text style={styles.title}>Learn {hobbyName} from Comics</Text>
        <Text style={styles.sub}>5 AI manga panels • tap to start</Text>
      </View>
      <Text style={styles.arrow}>→</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: spacing.lg,
    marginTop: spacing.md,
    padding: spacing.md,
    borderWidth: 3,
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.bgElevated,
    gap: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 4,
  },
  cardPressed: {
    transform: [{ translateX: 4 }, { translateY: 4 }],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  icon: { fontSize: 32 },
  body: { flex: 1 },
  title: { fontSize: 14, fontWeight: '900', color: colors.text },
  sub: { fontSize: 11, fontWeight: '600', color: colors.textMuted, marginTop: 2 },
  arrow: { fontSize: 20, fontWeight: '900', color: colors.primary },
});
