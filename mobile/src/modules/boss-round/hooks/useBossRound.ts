import { useState, useEffect, useRef, useCallback } from 'react';
import { useUserStore } from '../../../app/store/rootStore';
import { useBossRoundStore } from '../store/bossRound.store';
import { bossRoundService } from '../services/bossRound.service';
import { GAME_CONFIG } from '../../../shared/constants/gameConfig';

export type BossRoundStatus = 'loading' | 'playing' | 'done' | 'error';

export interface BossRoundResult {
  correctCount: number;
  wrongCount: number;
  xpGained: number;
  xpLost: number;
  maxCombo: number;
}

export function useBossRound(hobbyId: string) {
  const [status, setStatus] = useState<BossRoundStatus>('loading');
  const [timeLeft, setTimeLeft] = useState<number>(GAME_CONFIG.BOSS_ROUND.DURATION_SECONDS);
  const [result, setResult] = useState<BossRoundResult | null>(null);

  const sessionIdRef = useRef<string | null>(null);
  const answersRef = useRef<Array<{ questionId: string; selectedIndex: number; timeMs: number }>>([]);
  const answerStartRef = useRef(0);
  const submittedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const correctCountRef = useRef(0);
  const wrongCountRef = useRef(0);
  const xpGainedRef = useRef(0);
  const xpLostRef = useRef(0);
  const comboRef = useRef(0);
  const maxComboRef = useRef(0);

  const addXP = useUserStore((s) => s.addXP);
  const questions = useBossRoundStore((s) => s.questions);
  const currentIndex = useBossRoundStore((s) => s.currentIndex);
  const combo = useBossRoundStore((s) => s.combo);
  const xpGained = useBossRoundStore((s) => s.xpGained);
  const xpLost = useBossRoundStore((s) => s.xpLost);
  const storeStart = useBossRoundStore((s) => s.start);
  const storeAnswer = useBossRoundStore((s) => s.answer);
  const storeReset = useBossRoundStore((s) => s.reset);

  useEffect(() => { xpGainedRef.current = xpGained; }, [xpGained]);
  useEffect(() => { xpLostRef.current = xpLost; }, [xpLost]);
  useEffect(() => { comboRef.current = combo; }, [combo]);

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
      setResult({
        correctCount: correctCountRef.current,
        wrongCount: wrongCountRef.current,
        xpGained: xpGainedRef.current,
        xpLost: xpLostRef.current,
        maxCombo: maxComboRef.current,
      });
      return;
    }

    try {
      const res = await bossRoundService.submit({
        sessionId: sessionIdRef.current,
        answers: answersRef.current,
      });
      addXP(res.xpGained - res.xpLost);
      setResult(res);
    } catch {
      addXP(xpGainedRef.current - xpLostRef.current);
      setResult({
        correctCount: correctCountRef.current,
        wrongCount: wrongCountRef.current,
        xpGained: xpGainedRef.current,
        xpLost: xpLostRef.current,
        maxCombo: maxComboRef.current,
      });
    }
  }, [addXP, stopTimer]);

  useEffect(() => {
    submittedRef.current = false;
    answersRef.current = [];
    correctCountRef.current = 0;
    wrongCountRef.current = 0;
    xpGainedRef.current = 0;
    xpLostRef.current = 0;
    comboRef.current = 0;
    maxComboRef.current = 0;
    storeReset();

    bossRoundService
      .start(hobbyId)
      .then((data) => {
        sessionIdRef.current = data.sessionId;
        storeStart(data.sessionId, data.questions);
        setTimeLeft(GAME_CONFIG.BOSS_ROUND.DURATION_SECONDS);
        answerStartRef.current = Date.now();
        setStatus('playing');
      })
      .catch(() => setStatus('error'));

    return () => stopTimer();
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
      const isCorrect = selectedIndex === currentQ.correctIndex;

      answersRef.current = [
        ...answersRef.current,
        { questionId: currentQ.id, selectedIndex, timeMs },
      ];

      if (isCorrect) {
        const newCombo = comboRef.current + 1;
        comboRef.current = newCombo;
        if (newCombo > maxComboRef.current) maxComboRef.current = newCombo;
        const mult =
          newCombo >= GAME_CONFIG.BOSS_ROUND.COMBO_THRESHOLD
            ? GAME_CONFIG.BOSS_ROUND.COMBO_MULTIPLIER
            : 1;
        const xp = GAME_CONFIG.BOSS_ROUND.XP_PER_CORRECT * mult;
        xpGainedRef.current += xp;
        correctCountRef.current++;
        storeAnswer(true, xp);
      } else {
        comboRef.current = 0;
        xpLostRef.current += GAME_CONFIG.BOSS_ROUND.XP_PENALTY_PER_WRONG;
        wrongCountRef.current++;
        storeAnswer(false, GAME_CONFIG.BOSS_ROUND.XP_PENALTY_PER_WRONG);
      }

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
    durationSeconds: GAME_CONFIG.BOSS_ROUND.DURATION_SECONDS,
    currentQuestion: questions[currentIndex] ?? null,
    questionIndex: currentIndex,
    totalQuestions: questions.length,
    combo,
    xpGained,
    xpLost,
    result,
    answer,
  };
}
