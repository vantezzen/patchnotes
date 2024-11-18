"use client";
import Game from "@/components/game/Game";
import { GameStateProvider } from "@/lib/game/gameState";
import { SocketProvider } from "@/lib/game/socket";
import { useParams } from "next/navigation";
import React from "react";

function GamePage() {
  const gameId = useParams().gameId as string;

  return (
    <GameStateProvider gameId={gameId}>
      <SocketProvider>
        <Game />
      </SocketProvider>
    </GameStateProvider>
  );
}

export default GamePage;
