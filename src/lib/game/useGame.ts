import { GameEvent, handleEvent, sendEvent } from "./gameEvent";
import { useGameState } from "./gameState";
import { useSocket } from "./socket";

export default function useGame() {
  const state = useGameState();
  const socket = useSocket();

  return {
    state,
    socket,
    trigger: (event: GameEvent) => {
      sendEvent(socket, event, state.gameId);
      handleEvent(event, state);
    },
  };
}
