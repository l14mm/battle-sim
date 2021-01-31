import { DiceRoll } from "./types";

export const ATTACK = "ATTACK";
interface AttackAction {
  type: typeof ATTACK;
  payload: { playerDamage: number; monsterDamage: number };
};

export const SET_DICE = "SET_DICE";
interface SetDiceAction {
  type: typeof SET_DICE;
  payload: {roll1: DiceRoll, roll2: DiceRoll, roll3: DiceRoll, roll4: DiceRoll};
};

export const ATTACK_FINISH = "ATTACK_FINISH";
interface AttackFinishAction {
  type: typeof ATTACK_FINISH;
};

export const RESET_GAME = "RESET_GAME";
interface ResetGameAction {
  type: typeof RESET_GAME;
};

export type Actions = AttackAction | SetDiceAction | AttackFinishAction | ResetGameAction;
