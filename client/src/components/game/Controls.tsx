import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GameState } from "@shared/schema";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface ControlsProps {
  gameState: GameState;
  onReset: () => void;
}

export function Controls({ gameState, onReset }: ControlsProps) {
  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">
              {gameState.gameOver ? "BINGO! 🎉" : "BINGO"}
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
        </div>
        <div className="flex gap-4 justify-center">
          {gameState.bingoLetters.map(({ letter, struck }, index) => (
            <span
              key={letter}
              className={cn(
                "text-2xl font-bold",
                struck ? "line-through text-primary" : "text-muted-foreground"
              )}
            >
              {letter}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}