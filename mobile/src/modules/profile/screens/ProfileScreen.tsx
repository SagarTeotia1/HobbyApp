import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQueryClient } from '@tanstack/react-query';
import { Typography } from '../../../shared/components/ui/Typography/Typography';
import { Button } from '../../../shared/components/ui/Button/Button';
import { colors, spacing } from '../../../app/theme';
import { useUserStore } from '../../../app/store/rootStore';
import { useLearningFeedStore } from '../../learning-feed/store/learningFeed.store';

export function ProfileScreen() {
  const queryClient = useQueryClient();
  const reset = useUserStore((s) => s.reset);
  const resetFeed = useLearningFeedStore((s) => s.resetAll);

  const handleDevReset = () => {
    reset();
    resetFeed();
    queryClient.clear();
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <View style={styles.body}>
        <Typography variant="heading">Profile</Typography>
        <Typography variant="body" muted>
          Avatar, stats, settings.
        </Typography>
      </View>
      <Button variant="secondary" label="Reset profile (dev)" onPress={handleDevReset} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg, padding: spacing.lg, gap: spacing.lg },
  body: { flex: 1, gap: spacing.sm },
});
