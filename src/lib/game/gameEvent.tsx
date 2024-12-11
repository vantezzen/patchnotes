import { Socket } from "socket.io-client";
import { GamePhase, GameState } from "./gameState";
import debugging from "debug";
import { isInAGame } from "./utils";
import { trackEvent } from "../analytics";
const debug = debugging("gameEvent");

export enum GameEventType {
  PlayerJoin = "playerJoin",
  PlayerLeave = "playerLeave",
  GameSync = "gameSync",

  SelectCzar = "selectCzar",

  RoundStart = "roundStart",
  PlayerCards = "playerCards",
  StartJudging = "startJudging",

  RoundEnd = "roundEnd",
  GameEnd = "gameEnd",
  InAGame = "inAGame",
}

export type GameEvent = {
  type: GameEventType;
  payload: unknown;
};

export function handleEvent(
  event: GameEvent,
  state: GameState,
  sendEvent: (event: GameEvent) => void
) {
  switch (event.type) {
    case GameEventType.PlayerJoin:
      debug("Player joined", event.payload);
      state.updateState({
        players: [...state.players, event.payload as string],
        isFullyJoined: true,
      });

      sendEvent({
        type: GameEventType.GameSync,
        payload: {
          players: [state.ownId, ...state.players],
          phase: state.phase,
          czar: state.czar,
          playerPoints: state.playerPoints,
          previousCzars: state.previousCzars,
        },
      });

      if (isInAGame(state.phase)) {
        // New player joined during a game - inform them about the round info
        sendEvent({
          type: GameEventType.InAGame,
          payload: {
            czar: state.czar,
            previousCzars: state.previousCzars,
            playerPoints: state.playerPoints,
          },
        });
      }
      break;
    case GameEventType.PlayerLeave:
      debug("Player left", event.payload);
      state.updateState({
        players: state.players.filter((p) => p !== event.payload),
        phase: state.czar === event.payload ? GamePhase.NoCzar : state.phase,
      });

      if (state.czar === event.payload) {
        debug("Czar left - entering no czar phase");
      }

      break;

    case GameEventType.GameSync:
      debug("Game sync", event.payload);

      if (state.isFullyJoined) {
        debug("Ignoring game sync as we are fully joined");
        return;
      }

      state.updateState({
        ...(event.payload as GameState),
        players: (event.payload as GameState).players.filter(
          (p) => p !== state.ownId
        ),
        isFullyJoined: true,
      });
      break;

    case GameEventType.SelectCzar:
      debug("Selecting czar", event.payload);
      trackEvent("select_czar");
      state.updateState({
        czar: event.payload as string,
        previousCzars: [...state.previousCzars, event.payload as string],
      });

      const isOwnCzar = state.ownId === event.payload;
      if (isOwnCzar && state.phase === GamePhase.SelectingCards) {
        debug("We are the czar but tried to select cards. Fixing phase");
        state.updateState({
          phase: GamePhase.WaitingForCards,
        });
      }

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
        isFullyJoined: true,
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
      trackEvent("round_end");

      const { winnerId, playerPoints } = event.payload as {
        winnerId: string;
        playerPoints: Record<string, number>;
      };

      state.updateState({
        phase: GamePhase.Roundup,
        winnerId,
        playerPoints,
      });
      break;

    case GameEventType.GameEnd:
      debug("Game end", event.payload);
      trackEvent("game_end");
      state.updateState({
        phase: GamePhase.GameEnd,
      });
      break;

    case GameEventType.InAGame:
      if (state.isFullyJoined) {
        debug("Ignoring in a game event as we are fully joined");
        return;
      }

      debug("We tried joining during an active game. Updating data");
      state.updateState({
        hasExistingRound: true,
        ...(event.payload as Partial<GameState>),
      });
      break;
  }
}

export function sendEvent(socket: Socket, event: GameEvent, gameId: string) {
  socket.emit("gameEvent", event, gameId);
}
