import { Button } from "@/components/ui/button";
import { startNewRound } from "@/lib/game/gameEventUtils";
import useGame from "@/lib/game/useGame";
import React from "react";
import BottomBar from "../BottomBar";
import PageContainer from "../PageContainer";
import { GameEventType } from "@/lib/game/gameEvent";

function NoCzar() {
  const { state, trigger } = useGame();

  return (
    <PageContainer className="flex justify-center items-center flex-col h-screen text-center">
      <h2 className="text-xl font-bold mb-3">The czar left</h2>

      <p className="text-zinc-500 font-medium mb-3">
        The current czar left the game - this ends the current round. Do you
        want to continue a new round with a new czar
      </p>

      <div className="grid gap-4 w-full">
        <Button
          onClick={() => startNewRound(state, trigger)}
          className="w-full"
          size="lg"
        >
          Start next round
        </Button>
        <Button
          onClick={() =>
            trigger({
              type: GameEventType.GameEnd,
              payload: null,
            })
          }
          variant="secondary"
        >
          End game
        </Button>
      </div>
      <BottomBar />
    </PageContainer>
  );
}

export default NoCzar;
