import { generateWinPatterns } from "./utils";

export type Player = "X" | "O" | null;
export type Board = Player[];

export interface InitialState {
  size: number;
  board: Board;
  currentPlayer: Player;
  winner: Player | null;
  isFull: boolean;
  isDraw: boolean;
  winPatterns: number[][];
}

export const initialState: InitialState = {
  size: 3,
  board: Array<Player | null>(3 * 3).fill(null),
  currentPlayer: "X",
  winner: null,
  isFull: false,
  isDraw: false,
  winPatterns: generateWinPatterns(3),
};
