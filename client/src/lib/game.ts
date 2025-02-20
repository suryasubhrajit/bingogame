import { CellState, GameState, GRID_SIZE, MINE_COUNT } from "@shared/schema";

export function createEmptyGrid(): CellState[][] {
  return Array(GRID_SIZE).fill(null).map(() =>
    Array(GRID_SIZE).fill(null).map(() => ({
      hasMine: false,
      isRevealed: false,
      adjacentMines: 0,
    }))
  );
}

export function initializeGame(): GameState {
  const grid = createEmptyGrid();
  let minesPlaced = 0;

  // Place mines randomly
  while (minesPlaced < MINE_COUNT) {
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);

    if (!grid[y][x].hasMine) {
      grid[y][x].hasMine = true;
      minesPlaced++;
    }
  }

  // Calculate adjacent mines
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (!grid[y][x].hasMine) {
        let count = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const ny = y + dy;
            const nx = x + dx;
            if (
              ny >= 0 && ny < GRID_SIZE &&
              nx >= 0 && nx < GRID_SIZE &&
              grid[ny][nx].hasMine
            ) {
              count++;
            }
          }
        }
        grid[y][x].adjacentMines = count;
      }
    }
  }

  return {
    grid,
    moves: 0,
    gameOver: false,
    won: false,
  };
}

export function revealCell(state: GameState, x: number, y: number): GameState {
  if (state.gameOver || state.grid[y][x].isRevealed) {
    return state;
  }

  const newGrid = state.grid.map(row => [...row]);
  newGrid[y][x] = { ...newGrid[y][x], isRevealed: true };

  if (newGrid[y][x].hasMine) {
    return {
      ...state,
      grid: newGrid,
      gameOver: true,
      won: false,
    };
  }

  // Reveal adjacent cells if no adjacent mines
  if (newGrid[y][x].adjacentMines === 0) {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const ny = y + dy;
        const nx = x + dx;
        if (
          ny >= 0 && ny < GRID_SIZE &&
          nx >= 0 && nx < GRID_SIZE &&
          !newGrid[ny][nx].isRevealed
        ) {
          const result = revealCell({ ...state, grid: newGrid }, nx, ny);
          newGrid.splice(0, newGrid.length, ...result.grid);
        }
      }
    }
  }

  // Check win condition
  const won = newGrid.every(row =>
    row.every(cell => cell.isRevealed || cell.hasMine)
  );

  return {
    grid: newGrid,
    moves: state.moves + 1,
    gameOver: won,
    won,
  };
}
