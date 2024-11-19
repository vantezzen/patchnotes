import { GameEvent, GameEventType } from "./gameEvent";
import { GameState } from "./gameState";
import { chooseNextCzar, getNewPrompt } from "./utils";

export function startNewRound(
  gameState: GameState,
  triggerEvent: (event: GameEvent) => void
) {
  const nextCzar = chooseNextCzar(gameState);
  triggerEvent({
    type: GameEventType.SelectCzar,
    payload: nextCzar,
  });
  gameState.czar = nextCzar; // Monkey-patch local state so we can start round directly

  setTimeout(() => {
    triggerEvent({ type: GameEventType.RoundStart, payload: getNewPrompt() });
  }, 100);
}
