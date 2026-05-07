import { GAME_CONFIG } from '../../../shared/constants/gameConfig';

export type NextAction = 'show_card' | 'trigger_speed' | 'trigger_boss';

export interface SessionEngineState {
  cardsSinceLastSpeed: number;
  cardsSinceLastBoss: number;
  lastRoundType: 'speed' | 'boss' | 'none';
}

export const SessionEngine = {
  getNextAction(state: SessionEngineState): NextAction {
    if (
      state.cardsSinceLastSpeed >= GAME_CONFIG.CARDS_BEFORE_SPEED_ROUND &&
      state.lastRoundType !== 'speed'
    ) {
      return 'trigger_speed';
    }

    if (
      state.lastRoundType === 'speed' &&
      state.cardsSinceLastBoss >= GAME_CONFIG.CARDS_BEFORE_BOSS_ROUND
    ) {
      return 'trigger_boss';
    }

    return 'show_card';
  },
};
