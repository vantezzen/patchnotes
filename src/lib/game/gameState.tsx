import { createContext, useContext, useEffect, useState } from "react";
import { getWordList } from "./utils";
import debugging from "debug";
const debug = debugging("game:gameState");

export enum GamePhase {
  WaitingForPlayers,

  WaitingForCards,
  SelectingCards,

  WaitingForJudge,
  Judging,

  Roundup,
}

export type GameState = {
  phase: GamePhase;
  players: string[]; // Socket IDs
  czar: string | null; // Socket ID
  previousCzars: string[]; // Socket IDs
  gameId: string;
  ownId?: string;
  winnerId?: string;
  prompt?: string;
  ownPoints: number;

  playedCards: Record<string, string[]>; // Socket ID -> cards
  ownCards: string[];

  updateState: (newState: Partial<GameState>) => void;
};

const gameStateContext = createContext<GameState | null>(null);
export default gameStateContext;

export function useGameState() {
  const gameState = useContext(gameStateContext);
  if (!gameState) {
    throw new Error("useGameState must be used within a GameStateProvider");
  }
  return gameState;
}

function createEmptyGameState(gameId: string, ownId?: string): GameState {
  return {
    phase: GamePhase.WaitingForPlayers,
    players: [],
    czar: null,
    previousCzars: [],
    gameId,
    playedCards: {},
    ownCards: getWordList(),
    ownId,
    ownPoints: 0,

    updateState: () => {
      // Placeholder - real implementation is in GameStateProvider
      throw new Error("Tried to use placeholder updateState");
    },
  };
}

export function GameStateProvider({
  children,
  gameId,
}: {
  children: React.ReactNode;
  gameId: string;
}) {
  const [gameState, setGameState] = useState<GameState>(
    createEmptyGameState(gameId)
  );
  useEffect(() => {
    const newState = createEmptyGameState(gameId, gameState.ownId);
    debug("Resetting game state", newState);
    setGameState(newState);
  }, [gameId]);

  return (
    <gameStateContext.Provider
      value={{
        ...gameState,
        updateState: (newState) => {
          setGameState((oldState) => ({
            ...oldState,
            ...newState,
          }));
        },
      }}
    >
      {children}
    </gameStateContext.Provider>
  );
}
