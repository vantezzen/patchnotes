import { GamePhase } from "@/lib/game/gameState";
import useGame from "@/lib/game/useGame";
import React from "react";
import WaitingForPlayers from "./phases/WaitingForPlayers";
import SelectingCards from "./phases/SelectingCards";
import WaitingForCards from "./phases/WaitingForCards";
import Judging from "./phases/Judging";
import Roundup from "./phases/Roundup";
import WaitingForJudge from "./phases/WaitingForJudge";
import GameEnd from "./phases/GameEnd";
import NoCzar from "./phases/NoCzar";
import NoPlayers from "./phases/NoPlayers";

const PhaseComponents: Record<GamePhase, React.ComponentType> = {
  [GamePhase.WaitingForPlayers]: WaitingForPlayers,
  [GamePhase.SelectingCards]: SelectingCards,
  [GamePhase.WaitingForCards]: WaitingForCards,
  [GamePhase.WaitingForJudge]: WaitingForJudge,
  [GamePhase.Judging]: Judging,
  [GamePhase.Roundup]: Roundup,
  [GamePhase.GameEnd]: GameEnd,
  [GamePhase.NoCzar]: NoCzar,
};

function Game() {
  const { state } = useGame();

  if (
    state.players.length === 0 &&
    state.phase !== GamePhase.WaitingForPlayers
  ) {
    return <NoPlayers />;
  }

  const PhaseComponent = PhaseComponents[state.phase];
  return <PhaseComponent />;
}

export default Game;
