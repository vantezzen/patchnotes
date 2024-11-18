import { Socket } from "socket.io-client";
import { GamePhase, GameState } from "./gameState";
import debugging from "debug";
const debug = debugging("gameEvent");

export enum GameEventType {
  PlayerJoin = "playerJoin",
  PlayerLeave = "playerLeave",
  SelectCzar = "selectCzar",
  RoundStart = "roundStart",
  StartJudging = "startJudging",
  PlayerCards = "playerCards",
  RoundEnd = "roundEnd",
}

export type GameEvent = {
  type: GameEventType;
  payload: unknown;
};

export function handleEvent(event: GameEvent, state: GameState) {
  switch (event.type) {
    case GameEventType.PlayerJoin:
      debug("Player joined", event.payload);
      state.updateState({
        players: [...state.players, event.payload as string],
      });
      break;
    case GameEventType.PlayerLeave:
      debug("Player left", event.payload);
      state.updateState({
        players: state.players.filter((p) => p !== event.payload),
      });
      break;
    case GameEventType.SelectCzar:
      debug("Selecting czar", event.payload);
      state.updateState({
        czar: event.payload as string,
        previousCzars: [...state.previousCzars, event.payload as string],
      });
      break;
    case GameEventType.RoundStart:
      debug(
        `Round start as ${state.ownId === state.czar ? "czar" : "player"} (${
          state.czar
        } === ${state.ownId})`
      );
      state.updateState({
        phase:
          state.czar === state.ownId
            ? GamePhase.WaitingForCards
            : GamePhase.SelectingCards,
        playedCards: {},
        prompt: event.payload as string,
      });
      break;
    case GameEventType.StartJudging:
      debug("Start judging");
      state.updateState({
        phase:
          state.czar === state.ownId
            ? GamePhase.Judging
            : GamePhase.WaitingForJudge,
      });
      break;
    case GameEventType.PlayerCards:
      debug("Received cards", event.payload);
      const { id, cards } = event.payload as { id: string; cards: string[] };
      state.updateState({
        playedCards: {
          ...state.playedCards,
          [id]: cards,
        },
      });
      break;
    case GameEventType.RoundEnd:
      debug("Round end", event.payload);

      const isWinner = state.ownId === event.payload;
      state.updateState({
        winnerId: event.payload as string,
        phase: GamePhase.Roundup,
        ownPoints: state.ownPoints + (isWinner ? 1 : 0),
      });
      break;
  }
}

export function sendEvent(socket: Socket, event: GameEvent, gameId: string) {
  socket.emit("gameEvent", event, gameId);
}
