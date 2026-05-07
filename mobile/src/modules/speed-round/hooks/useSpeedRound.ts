import { useState, useEffect, useRef, useCallback } from 'react';
import { useUserStore } from '../../../app/store/rootStore';
import { useSpeedRoundStore } from '../store/speedRound.store';
import { speedRoundService } from '../services/speedRound.service';
import { GAME_CONFIG } from '../../../shared/constants/gameConfig';

export type SpeedRoundStatus = 'loading' | 'playing' | 'done' | 'error';

export function useSpeedRound(hobbyId: string) {
  const [status, setStatus] = useState<SpeedRoundStatus>('loading');
  const [timeLeft, setTimeLeft] = useState<number>(GAME_CONFIG.SPEED_ROUND.DURATION_SECONDS);
  const [result, setResult] = useState<{ correctCount: number; xpGained: number } | null>(null);

  const sessionIdRef = useRef<string | null>(null);
  const answersRef = useRef<Array<{ questionId: string; selectedIndex: number; timeMs: number }>>([]);
  const answerStartRef = useRef<number>(0);
  const submittedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const correctCountRef = useRef(0);

  const addXP = useUserStore((s) => s.addXP);
  const questions = useSpeedRoundStore((s) => s.questions);
  const currentIndex = useSpeedRoundStore((s) => s.currentIndex);
  const correctCount = useSpeedRoundStore((s) => s.correctCount);
  const storeStart = useSpeedRoundStore((s) => s.start);
  const storeAnswer = useSpeedRoundStore((s) => s.answer);
  const storeReset = useSpeedRoundStore((s) => s.reset);

  useEffect(() => {
    correctCountRef.current = correctCount;
  }, [correctCount]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const doSubmit = useCallback(async () => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    stopTimer();
    setStatus('done');

    if (!sessionIdRef.current) {
      setResult({ correctCount: correctCountRef.current, xpGained: 0 });
      return;
    }

    try {
      const res = await speedRoundService.submit({
        sessionId: sessionIdRef.current,
        answers: answersRef.current,
      });
      addXP(res.xpGained);
      setResult(res);
    } catch {
      const cc = correctCountRef.current;
      setResult({ correctCount: cc, xpGained: cc * GAME_CONFIG.SPEED_ROUND.XP_PER_CORRECT });
    }
  }, [addXP, stopTimer]);

  useEffect(() => {
    submittedRef.current = false;
    answersRef.current = [];
    correctCountRef.current = 0;
    storeReset();

    speedRoundService
      .start(hobbyId)
      .then((data) => {
        sessionIdRef.current = data.sessionId;
        storeStart(data.sessionId, data.questions);
        setTimeLeft(data.durationSeconds);
        answerStartRef.current = Date.now();
        setStatus('playing');
      })
      .catch(() => setStatus('error'));

    return () => {
      stopTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hobbyId]);

  useEffect(() => {
    if (status !== 'playing') return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          void doSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return stopTimer;
  }, [status, doSubmit, stopTimer]);

  const answer = useCallback(
    (selectedIndex: number) => {
      if (status !== 'playing' || submittedRef.current) return;

      const currentQ = questions[currentIndex];
      if (!currentQ) return;

      const timeMs = Date.now() - answerStartRef.current;
      answersRef.current = [
        ...answersRef.current,
        { questionId: currentQ.id, selectedIndex, timeMs },
      ];

      storeAnswer(selectedIndex === currentQ.correctIndex);
      answerStartRef.current = Date.now();

      if (currentIndex + 1 >= questions.length) {
        void doSubmit();
      }
    },
    [status, questions, currentIndex, storeAnswer, doSubmit],
  );

  return {
    status,
    timeLeft,
    durationSeconds: GAME_CONFIG.SPEED_ROUND.DURATION_SECONDS,
    currentQuestion: questions[currentIndex] ?? null,
    questionIndex: currentIndex,
    totalQuestions: questions.length,
    correctCount,
    result,
    answer,
  };
}
