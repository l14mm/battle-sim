import { MAX_HEALTH_PLAYER, MAX_HEALTH_MONSTER } from "../config";
import {
  Actions,
  ATTACK,
  SET_DICE,
  ATTACK_FINISH,
  RESET_GAME,
} from "./actions";
import { DiceRoll, GameState } from "./types";

export type State = {
  playerHealth: number;
  monsterHealth: number;
  attackMessage: string;
  gameState: GameState;
  playerDice1: DiceRoll | null;
  playerDice2: DiceRoll | null;
  monsterDice1: DiceRoll | null;
  monsterDice2: DiceRoll | null;
  attacking: boolean;
  attacks: number;
};

export const initialState: State = {
  playerHealth: MAX_HEALTH_PLAYER,
  monsterHealth: MAX_HEALTH_MONSTER,
  attackMessage: "Click the attack button to start",
  gameState: GameState.playing,
  playerDice1: null,
  playerDice2: null,
  monsterDice1: null,
  monsterDice2: null,
  attacking: false,
  attacks: 0,
};

export const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case ATTACK: {
      const { playerDamage, monsterDamage } = action.payload;
      if (playerDamage > monsterDamage) {
        const damage = playerDamage - monsterDamage;
        const newHealth = state.monsterHealth - damage;
        if (newHealth <= 0) {
          return {
            ...state,
            monsterHealth: 0,
            attackMessage: `You hit for ${damage}`,
            gameState: GameState.win,
            attacking: true,
            attacks: state.attacks + 1,
          };
        }
        return {
          ...state,
          monsterHealth: newHealth,
          attackMessage: `You hit for ${damage}`,
          attacking: true,
          attacks: state.attacks + 1,
        };
      } else if (monsterDamage > playerDamage) {
        const damage = monsterDamage - playerDamage;
        const newHealth = state.playerHealth - damage;
        if (newHealth <= 0) {
          return {
            ...state,
            playerHealth: 0,
            attackMessage: `Monster hit for ${damage}`,
            gameState: GameState.lose,
            attacking: true,
            attacks: state.attacks + 1,
          };
        }
        return {
          ...state,
          playerHealth: newHealth,
          attackMessage: `Monster hit for ${damage}`,
          attacking: true,
          attacks: state.attacks + 1,
        };
      }
      return {
        ...state,
        attackMessage: `Equal damage`,
        attacks: state.attacks + 1,
      };
    }
    case SET_DICE:
      const { roll1, roll2, roll3, roll4 } = action.payload;
      return {
        ...state,
        playerDice1: roll1,
        playerDice2: roll2,
        monsterDice1: roll3,
        monsterDice2: roll4,
      };
    case ATTACK_FINISH:
      return {
        ...state,
        attacking: false,
      };
    case RESET_GAME:
      return initialState;

    default:
      return state;
  }
};
