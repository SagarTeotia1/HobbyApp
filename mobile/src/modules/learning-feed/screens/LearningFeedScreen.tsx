import React, { useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../../shared/components/ui/Typography/Typography';
import { colors, spacing } from '../../../app/theme';
import { useUserStore } from '../../../app/store/rootStore';
import { useLearningFeed } from '../hooks/useLearningFeed';
import { CardSkeleton } from '../../../shared/components/loaders/CardSkeleton';
import { SessionHeader } from '../components/SessionHeader/SessionHeader';
import { SwipeDeck } from '../components/SwipeDeck/SwipeDeck';
import { SwipeHints } from '../components/SwipeHints/SwipeHints';
import { useSwipeActions } from '../hooks/useSwipeActions';
import { useSessionRound } from '../hooks/useSessionRound';
import { Button } from '../../../shared/components/ui/Button/Button';

export function LearningFeedScreen() {
  const hobbyId = useUserStore((s) => s.currentHobbyId);
  const setHobby = useUserStore((s) => s.setHobby);
  const activeHobbyId = hobbyId ?? 'chess';
  const { data, isLoading, isError, error, refetch, isFetching } = useLearningFeed(activeHobbyId);
  const cards = useMemo(() => data?.pages.flatMap((page) => page.cards) ?? [], [data]);
  const [deckCards, setDeckCards] = useState(cards);
  const { onSwipe } = useSwipeActions();
  const { advance } = useSessionRound();
  const [bookmarked, setBookmarked] = useState(false);

  React.useEffect(() => {
    if (cards.length > 0) {
      setDeckCards(cards);
    }
  }, [cards]);

  React.useEffect(() => {
    if (!hobbyId) {
      // Keep feed usable if onboarding state is partially missing.
      setHobby(activeHobbyId);
    }
  }, [activeHobbyId, hobbyId, setHobby]);

  const handleSwipe = async (cardId: string, direction: 'left' | 'right' | 'down') => {
    await onSwipe(cardId, direction, 1200);
    setDeckCards((prev) => prev.filter((card) => card.id !== cardId));
    advance();
  };

  React.useEffect(() => {
    if (deckCards.length > 0 || isLoading || isFetching) return;
    const t = setTimeout(() => {
      void refetch();
    }, 2500);
    return () => clearTimeout(t);
  }, [deckCards.length, isFetching, isLoading, refetch]);

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <SessionHeader
        hobbyName={hobbyId ?? 'Hobby'}
        cardIndex={1}
        totalCards={Math.max(deckCards.length, 1)}
        isBookmarked={bookmarked}
        onBookmark={() => setBookmarked((v) => !v)}
      />
      <View style={styles.body}>
        {isLoading || isFetching ? <CardSkeleton /> : <SwipeDeck cards={deckCards} onSwipe={handleSwipe} />}
      </View>
      <SwipeHints />
      {isError ? (
        <Typography variant="caption" color={colors.danger}>
          {error instanceof Error ? error.message : 'Failed to load cards'}
        </Typography>
      ) : null}
      {deckCards.length === 0 && !isLoading ? (
        <View style={styles.emptyState}>
          <Typography variant="body" muted>
            Preparing your cards...
          </Typography>
          <Button label="Refresh cards" variant="secondary" onPress={() => void refetch()} />
        </View>
      ) : null}
      {isError ? (
        <Typography variant="caption" color={colors.primary} onPress={() => void refetch()}>
          Tap to retry
        </Typography>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg, padding: spacing.lg },
  body: { flex: 1, gap: spacing.sm },
  emptyState: { gap: spacing.md, alignItems: 'center' },
});
