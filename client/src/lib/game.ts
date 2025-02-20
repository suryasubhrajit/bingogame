import { CellState, GameState, GRID_SIZE, BINGO_LETTERS, Pattern } from "@shared/schema";

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function createEmptyGrid(): CellState[][] {
  // Generate numbers 1-25
  const numbers = shuffleArray(Array.from({ length: 25 }, (_, i) => i + 1));

  return Array(GRID_SIZE)
    .fill(null)
    .map((_, row) =>
      Array(GRID_SIZE)
        .fill(null)
        .map((_, col) => ({
          number: numbers[row * GRID_SIZE + col],
          isSelected: false,
        }))
    );
}

function checkPattern(grid: CellState[][], type: 'row' | 'column' | 'diagonal', index: number): boolean {
  if (type === 'row') {
    return grid[index].every(cell => cell.isSelected);
  } else if (type === 'column') {
    return grid.every(row => row[index].isSelected);
  } else if (type === 'diagonal') {
    if (index === 0) {
      return Array(GRID_SIZE).fill(null).every((_, i) => grid[i][i].isSelected);
    } else {
      return Array(GRID_SIZE).fill(null).every((_, i) => grid[i][GRID_SIZE - 1 - i].isSelected);
    }
  }
  return false;
}

export function initializeGame(): GameState {
  // Initialize patterns for all possible winning combinations
  const patterns: Pattern[] = [
    ...Array(GRID_SIZE).fill(null).map((_, i) => ({ type: 'row' as const, index: i, completed: false })),
    ...Array(GRID_SIZE).fill(null).map((_, i) => ({ type: 'column' as const, index: i, completed: false })),
    { type: 'diagonal' as const, index: 0, completed: false },
    { type: 'diagonal' as const, index: 1, completed: false },
  ];

  return {
    grid: createEmptyGrid(),
    patterns,
    bingoLetters: BINGO_LETTERS.map(letter => ({ letter, struck: false })),
    gameOver: false,
    moves: 0,
  };
}

export function selectCell(state: GameState, x: number, y: number): GameState {
  if (state.gameOver) {
    return state;
  }

  const newGrid = state.grid.map(row => [...row]);
  newGrid[y][x] = { ...newGrid[y][x], isSelected: true };

  // Check all patterns and update their status
  const newPatterns = state.patterns.map(pattern => ({
    ...pattern,
    completed: checkPattern(newGrid, pattern.type, pattern.index),
  }));

  // Count newly completed patterns
  const newlyCompleted = newPatterns.filter(
    (p, i) => p.completed && !state.patterns[i].completed
  ).length;

  // Update BINGO letters based on newly completed patterns
  const newBingoLetters = [...state.bingoLetters];
  for (let i = 0; i < newlyCompleted && i < newBingoLetters.length; i++) {
    const nextUnstruckIndex = newBingoLetters.findIndex(l => !l.struck);
    if (nextUnstruckIndex !== -1) {
      newBingoLetters[nextUnstruckIndex] = { ...newBingoLetters[nextUnstruckIndex], struck: true };
    }
  }

  // Check if game is won (all BINGO letters are struck)
  const gameOver = newBingoLetters.every(l => l.struck);

  return {
    grid: newGrid,
    patterns: newPatterns,
    bingoLetters: newBingoLetters,
    moves: state.moves + 1,
    gameOver,
  };
}