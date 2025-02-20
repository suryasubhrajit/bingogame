import { useState } from "react";
import { Controls } from "@/components/game/Controls";
import { Grid } from "@/components/game/Grid";
import { initializeGame, selectCell } from "@/lib/game";
import { GameState } from "@shared/schema";

export default function Game() {
  const [gameState, setGameState] = useState<GameState>(initializeGame());

  const handleCellClick = (x: number, y: number) => {
    if (!gameState.gameOver) {
      setGameState(prev => selectCell(prev, x, y));
    }
  };

  const handleReset = () => {
    setGameState(initializeGame());
  };

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-4">
        <Controls gameState={gameState} onReset={handleReset} />
        <Grid gameState={gameState} onCellClick={handleCellClick} />
      </div>
    </div>
  );
}