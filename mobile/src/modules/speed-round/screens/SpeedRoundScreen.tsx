import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Typography } from '../../../shared/components/ui/Typography/Typography';
import { Button } from '../../../shared/components/ui/Button/Button';
import { FullScreenLoader } from '../../../shared/components/loaders/FullScreenLoader';
import { SpeedTimerBar } from '../components/SpeedTimerBar/SpeedTimerBar';
import { SpeedQuestion } from '../components/SpeedQuestion/SpeedQuestion';
import { SpeedResults } from '../components/SpeedResults/SpeedResults';
import { useSpeedRound } from '../hooks/useSpeedRound';
import { useUserStore } from '../../../app/store/rootStore';
import { colors, spacing } from '../../../app/theme';
import type { FeedStackParamList } from '../../../app/navigation/types';
import { ROUTES } from '../../../app/navigation/routes';

export function SpeedRoundScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<FeedStackParamList>>();
  const hobbyId = useUserStore((s) => s.currentHobbyId) ?? 'chess';

  const {
    status,
    timeLeft,
    durationSeconds,
    currentQuestion,
    questionIndex,
    totalQuestions,
    correctCount,
    result,
    answer,
  } = useSpeedRound(hobbyId);

  const handleContinue = () => {
    navigation.goBack();
  };

  if (status === 'loading') {
    return <FullScreenLoader />;
  }

  if (status === 'error') {
    return (
      <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
        <View style={styles.center}>
          <Typography variant="heading">Failed to load round</Typography>
          <Button label="Go back" onPress={handleContinue} />
        </View>
      </SafeAreaView>
    );
  }

  if (status === 'done' && result) {
    return (
      <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
        <SpeedResults
          result={{
            sessionId: '',
            userId: '',
            hobbyId,
            correctCount: result.correctCount,
            totalAnswered: questionIndex,
            durationSeconds,
            xpEarned: result.xpGained,
            completedAt: new Date().toISOString(),
          }}
          onContinue={handleContinue}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Typography variant="caption" muted>
          ⚡ SPEED ROUND
        </Typography>
        <View style={styles.scoreRow}>
          <Typography variant="body">
            {questionIndex + 1} / {totalQuestions}
          </Typography>
          <Typography variant="body" style={styles.score}>
            ✓ {correctCount}
          </Typography>
        </View>
        <SpeedTimerBar
          durationSeconds={durationSeconds}
          timeLeft={timeLeft}
        />
      </View>

      <View style={styles.body}>
        {currentQuestion ? (
          <SpeedQuestion
            key={currentQuestion.id}
            question={currentQuestion}
            onAnswer={answer}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.sm,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  score: {
    color: colors.success,
  },
  body: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
    padding: spacing.xl,
  },
});
