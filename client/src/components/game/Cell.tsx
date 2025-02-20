import { CellState } from "@shared/schema";
import { cn } from "@/lib/utils";

interface CellProps {
  cell: CellState;
  onClick: () => void;
}

export function Cell({ cell, onClick }: CellProps) {
  return (
    <button
      className={cn(
        "w-full aspect-square border border-border",
        "flex items-center justify-center text-lg font-bold",
        "transition-colors duration-200",
        cell.isSelected
          ? "bg-primary text-primary-foreground"
          : "bg-background hover:bg-primary/10",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
      )}
      onClick={onClick}
      disabled={cell.isSelected}
    >
      {cell.number}
    </button>
  );
}