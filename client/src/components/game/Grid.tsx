import { GameState } from "@shared/schema";
import { Cell } from "./Cell";

interface GridProps {
  gameState: GameState;
  onCellClick: (x: number, y: number) => void;
}

export function Grid({ gameState, onCellClick }: GridProps) {
  return (
    <div className="grid grid-cols-10 gap-1 bg-muted p-4 rounded-lg shadow-md">
      {gameState.grid.map((row, y) =>
        row.map((cell, x) => (
          <Cell
            key={`${x}-${y}`}
            cell={cell}
            revealed={cell.isRevealed}
            onClick={() => onCellClick(x, y)}
          />
        ))
      )}
    </div>
  );
}
