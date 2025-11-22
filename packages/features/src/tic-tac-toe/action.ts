import type { StateCreator } from "zustand/vanilla";

import type { Board, Player } from "./initial-state";
import { initialState } from "./initial-state";
import type { TicTacToeStore } from "./store";
import { generateWinPatterns } from "./utils";

export interface TicTacToeActions {
  makeMove: (index: number) => void;
  resetGame: () => void;
  changeSize: (newSize: number) => void;

  /**
   * INTERNAL USE ONLY
   */
  INTERNAL_getWinner: (board: Board) => Player | null;
  INTERNAL_generateWinPatterns: (size: number) => number[][];
}

export const createTicTacToeActions: StateCreator<
  TicTacToeStore,
  [],
  [],
  TicTacToeActions
> = (set, get) => ({
  makeMove: (index) => {
    const { board, currentPlayer, winner, isDraw } = get();

    if (board[index] || winner || isDraw) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = currentPlayer;

    const newWinner = get().INTERNAL_getWinner(newBoard);

    const isFull = newBoard.every((cell) => cell !== null);
    const newIsDraw = !newWinner && isFull;

    set({
      board: newBoard,
      currentPlayer: currentPlayer === "X" ? "O" : "X",
      winner: newWinner,
      isFull,
      isDraw: newIsDraw,
    });
  },
  resetGame: () => {
    const { size } = get();
    set({
      ...initialState,
      size,
      board: Array(size * size).fill(null),
      winPatterns: generateWinPatterns(size),
    });
  },
  changeSize: (newSize: number) => {
    get().INTERNAL_generateWinPatterns(newSize);
    set({
      ...initialState,
      size: newSize,
      board: Array(newSize * newSize).fill(null),
      winPatterns: generateWinPatterns(newSize),
    });
  },
  INTERNAL_getWinner: (board) => {
    const winPatterns = get().winPatterns;

    let winner: Player | null = null;

    for (const pattern of winPatterns) {
      const firstCell = board[pattern?.[0] ?? 0];
      if (firstCell && pattern.every((index) => board[index] === firstCell)) {
        winner = firstCell;
        return firstCell;
      }
    }
    set({ winner });
    return winner;
  },
  INTERNAL_generateWinPatterns: (size) => {
    const patterns = generateWinPatterns(size);

    set({ winPatterns: patterns });

    return patterns;
  },
});
