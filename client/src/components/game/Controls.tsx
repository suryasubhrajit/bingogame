import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GameState } from "@shared/schema";
import { RefreshCw } from "lucide-react";

interface ControlsProps {
  gameState: GameState;
  onReset: () => void;
}

export function Controls({ gameState, onReset }: ControlsProps) {
  return (
    <Card className="mb-4">
      <CardContent className="pt-6 flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">
            {gameState.gameOver
              ? gameState.won
                ? "You Won! 🎉"
                : "Game Over! 💥"
              : "Minesweeper"}
          </h2>
          <p className="text-muted-foreground">
            Moves: {gameState.moves}
          </p>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={onReset}
          className="h-8 w-8"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
