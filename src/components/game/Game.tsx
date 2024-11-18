import { GamePhase } from "@/lib/game/gameState";
import useGame from "@/lib/game/useGame";
import React from "react";
import WaitingForPlayers from "./phases/WaitingForPlayers";
import SelectingCards from "./phases/SelectingCards";
import WaitingForCards from "./phases/WaitingForCards";
import Judging from "./phases/Judging";
import Roundup from "./phases/Roundup";
import WaitingForJudge from "./phases/WaitingForJudge";

const PhaseComponents: Record<GamePhase, React.ComponentType> = {
  [GamePhase.WaitingForPlayers]: WaitingForPlayers,
  [GamePhase.SelectingCards]: SelectingCards,
  [GamePhase.WaitingForCards]: WaitingForCards,
  [GamePhase.WaitingForJudge]: WaitingForJudge,
  [GamePhase.Judging]: Judging,
  [GamePhase.Roundup]: Roundup,
};

function Game() {
  const { state } = useGame();

  const PhaseComponent = PhaseComponents[state.phase];
  return <PhaseComponent />;
}

export default Game;
