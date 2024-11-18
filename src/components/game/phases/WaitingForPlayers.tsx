import React from "react";
import Serif from "../../Serif";
import { Button } from "../../ui/button";
import { ChevronRight } from "lucide-react";
import useGame from "@/lib/game/useGame";
import { startNewRound } from "@/lib/game/gameEventUtils";
import BottomBar from "../BottomBar";

function WaitingForPlayers() {
  const { state, trigger } = useGame();

  return (
    <div className="flex justify-center p-12 flex-col min-h-screen bg-brand-50">
      <Serif>
        <h1 className="text-xl font-bold">Waiting for players...</h1>
      </Serif>

      <p className="text-gray-700 font-medium mt-4 text-sm">
        Other players can join by going to{" "}
        <strong>
          {window.location.host}/game/{state.gameId}
        </strong>{" "}
        or entering the game ID
      </p>

      <Serif>
        <h2 className="text-3xl font-bold mt-3 mb-3 text-center">
          {state.gameId}
        </h2>
      </Serif>

      <p className="text-center text-zinc-500">
        {Object.values(state.players).length + 1} players in this lobby
      </p>

      <Button
        className="mt-3 text-lg p-8"
        onClick={() => {
          startNewRound(state, trigger);
        }}
        disabled={Object.keys(state.players).length < 1}
      >
        <Serif>
          <div className="flex items-center gap-3">
            Start game now
            <ChevronRight className="w-6 h-6" />
          </div>
        </Serif>
      </Button>

      <BottomBar />
    </div>
  );
}

export default WaitingForPlayers;
