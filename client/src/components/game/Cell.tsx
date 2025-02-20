import { CellState } from "@shared/schema";
import { cn } from "@/lib/utils";

interface CellProps {
  cell: CellState;
  revealed: boolean;
  onClick: () => void;
}

export function Cell({ cell, onClick }: CellProps) {
  return (
    <button
      className={cn(
        "w-full aspect-square border border-border",
        "flex items-center justify-center text-sm font-medium",
        "transition-colors duration-200",
        cell.isRevealed
          ? "bg-background"
          : "bg-primary/10 hover:bg-primary/20 cursor-pointer",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
      )}
      onClick={onClick}
      disabled={cell.isRevealed}
    >
      {cell.isRevealed && (
        cell.hasMine 
          ? <span className="text-destructive">💣</span>
          : cell.adjacentMines > 0 
            ? <span className={cn(
                "font-bold",
                cell.adjacentMines === 1 && "text-blue-500",
                cell.adjacentMines === 2 && "text-green-500",
                cell.adjacentMines >= 3 && "text-red-500"
              )}>
                {cell.adjacentMines}
              </span>
            : null
      )}
    </button>
  );
}
