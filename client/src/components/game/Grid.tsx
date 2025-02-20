import { GameState, GRID_SIZE } from "@shared/schema";
import { Cell } from "./Cell";

interface GridProps {
  gameState: GameState;
  onCellClick: (x: number, y: number) => void;
}

export function Grid({ gameState, onCellClick }: GridProps) {
  return (
    <div 
      className="grid gap-1 bg-muted p-4 rounded-lg shadow-md"
      style={{
        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`
      }}
    >
      {gameState.grid.map((row, y) =>
        row.map((cell, x) => (
          <Cell
            key={`${x}-${y}`}
            cell={cell}
            onClick={() => onCellClick(x, y)}
          />
        ))
      )}
    </div>
  );
}