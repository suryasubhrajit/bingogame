import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define cell states
export type CellState = {
  hasMine: boolean;
  isRevealed: boolean;
  adjacentMines: number;
};

// Define game state
export type GameState = {
  grid: CellState[][];
  moves: number;
  gameOver: boolean;
  won: boolean;
};

// Game configuration
export const GRID_SIZE = 10;
export const MINE_COUNT = 10;
