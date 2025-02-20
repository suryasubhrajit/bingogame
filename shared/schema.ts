import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define cell states
export type CellState = {
  number: number;
  isSelected: boolean;
};

// Define pattern types
export type Pattern = {
  type: 'row' | 'column' | 'diagonal';
  index: number;
  completed: boolean;
};

// Define game state
export type GameState = {
  grid: CellState[][];
  patterns: Pattern[];
  bingoLetters: { letter: string; struck: boolean }[];
  gameOver: boolean;
  moves: number;
};

// Game configuration
export const GRID_SIZE = 5;
export const BINGO_LETTERS = ['B', 'I', 'N', 'G', 'O'];