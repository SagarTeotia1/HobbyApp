import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../../shared/components/ui/Typography/Typography';
import { Button } from '../../../shared/components/ui/Button/Button';
import { colors, spacing } from '../../../app/theme';
import { useUserStore } from '../../../app/store/rootStore';

export function ProfileScreen() {
  const reset = useUserStore((s) => s.reset);

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <View style={styles.body}>
        <Typography variant="heading">Profile</Typography>
        <Typography variant="body" muted>
          Avatar, stats, settings.
        </Typography>
      </View>
      <Button variant="secondary" label="Reset profile (dev)" onPress={reset} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg, padding: spacing.lg, gap: spacing.lg },
  body: { flex: 1, gap: spacing.sm },
});
