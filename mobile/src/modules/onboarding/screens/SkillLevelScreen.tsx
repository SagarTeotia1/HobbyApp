import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../../shared/components/ui/Typography/Typography';
import { Button } from '../../../shared/components/ui/Button/Button';
import { colors, spacing } from '../../../app/theme';
import { useUserStore } from '../../../app/store/rootStore';

export function SkillLevelScreen() {
  const setOnboarded = useUserStore((s) => s.setOnboarded);

  const handleFinish = () => {
    setOnboarded(true);
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <View style={styles.body}>
        <Typography variant="title">Your skill level</Typography>
        <Typography variant="body" muted>
          Beginner / Intermediate / Advanced
        </Typography>
      </View>
      <Button label="Start learning" onPress={handleFinish} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg, padding: spacing.lg, gap: spacing.lg },
  body: { flex: 1, gap: spacing.sm },
});
