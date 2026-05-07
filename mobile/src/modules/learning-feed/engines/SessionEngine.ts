import { GAME_CONFIG } from '../../../shared/constants/gameConfig';

export type SessionPhase = 'cards' | 'speed_round' | 'boss_round';

export interface SessionEngineState {
  cardsSinceLastSpeed: number;
  speedRoundsSinceLastBoss: number;
}

export const SessionEngine = {
  init(): SessionEngineState {
    return { cardsSinceLastSpeed: 0, speedRoundsSinceLastBoss: 0 };
  },

  next(state: SessionEngineState): { phase: SessionPhase; nextState: SessionEngineState } {
    const cardsSince = state.cardsSinceLastSpeed + 1;

    if (cardsSince >= GAME_CONFIG.CARDS_BEFORE_SPEED_ROUND) {
      const speedSince = state.speedRoundsSinceLastBoss + 1;
      const triggersBoss = speedSince >= 1 && cardsSince >= GAME_CONFIG.CARDS_BEFORE_BOSS_ROUND;

      if (triggersBoss && state.speedRoundsSinceLastBoss > 0) {
        return {
          phase: 'boss_round',
          nextState: { cardsSinceLastSpeed: 0, speedRoundsSinceLastBoss: 0 },
        };
      }

      return {
        phase: 'speed_round',
        nextState: { cardsSinceLastSpeed: 0, speedRoundsSinceLastBoss: speedSince },
      };
    }

    return {
      phase: 'cards',
      nextState: { ...state, cardsSinceLastSpeed: cardsSince },
    };
  },
};
