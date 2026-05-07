import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Typography } from '../../../shared/components/ui/Typography/Typography';
import { Button } from '../../../shared/components/ui/Button/Button';
import { FullScreenLoader } from '../../../shared/components/loaders/FullScreenLoader';
import { SpeedTimerBar } from '../../speed-round/components/SpeedTimerBar/SpeedTimerBar';
import { BossHeader } from '../components/BossHeader/BossHeader';
import { BossQuestion } from '../components/BossQuestion/BossQuestion';
import { BossResults } from '../components/BossResults/BossResults';
import { ComboCounter } from '../components/ComboCounter/ComboCounter';
import { XPMeter } from '../components/XPMeter/XPMeter';
import { useBossRound } from '../hooks/useBossRound';
import { useUserStore } from '../../../app/store/rootStore';
import { colors, spacing } from '../../../app/theme';
import type { FeedStackParamList } from '../../../app/navigation/types';
import { ROUTES } from '../../../app/navigation/routes';
import { GAME_CONFIG } from '../../../shared/constants/gameConfig';

const MAX_XP = GAME_CONFIG.BOSS_ROUND.TOTAL_QUESTIONS * GAME_CONFIG.BOSS_ROUND.XP_PER_CORRECT * GAME_CONFIG.BOSS_ROUND.COMBO_MULTIPLIER;

export function BossRoundScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<FeedStackParamList>>();
  const hobbyId = useUserStore((s) => s.currentHobbyId) ?? 'chess';

  const {
    status,
    timeLeft,
    durationSeconds,
    currentQuestion,
    questionIndex,
    totalQuestions,
    combo,
    xpGained,
    xpLost,
    result,
    answer,
  } = useBossRound(hobbyId);

  const netXP = xpGained - xpLost;

  const handleContinue = () => {
    navigation.navigate(ROUTES.FEED_PROGRESS);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  if (status === 'loading') {
    return <FullScreenLoader />;
  }

  if (status === 'error') {
    return (
      <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
        <View style={styles.center}>
          <Typography variant="heading">Failed to load boss round</Typography>
          <Button label="Go back" onPress={handleBack} />
        </View>
      </SafeAreaView>
    );
  }

  if (status === 'done' && result) {
    return (
      <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
        <BossResults
          result={{
            sessionId: '',
            userId: '',
            hobbyId,
            correctCount: result.correctCount,
            wrongCount: result.wrongCount,
            xpGained: result.xpGained,
            xpLost: result.xpLost,
            netXP: result.xpGained - result.xpLost,
            maxCombo: result.maxCombo,
            didWin: result.xpGained >= result.xpLost,
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
        <BossHeader currentXP={xpGained} netXP={netXP} />
        <XPMeter current={xpGained} max={MAX_XP} isGaining={netXP >= 0} />
        <View style={styles.meta}>
          <Typography variant="body">
            {questionIndex + 1} / {totalQuestions}
          </Typography>
          <Typography variant="caption" muted>
            {timeLeft}s
          </Typography>
        </View>
        <SpeedTimerBar durationSeconds={durationSeconds} timeLeft={timeLeft} />
        <ComboCounter count={combo} />
      </View>

      <View style={styles.body}>
        {currentQuestion ? (
          <BossQuestion
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
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
