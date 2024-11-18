import { Button } from "@/components/ui/button";
import { startNewRound } from "@/lib/game/gameEventUtils";
import useGame from "@/lib/game/useGame";
import React from "react";
import BottomBar from "../BottomBar";
import PageContainer from "../PageContainer";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { GameEventType } from "@/lib/game/gameEvent";

function Roundup() {
  const { state, trigger } = useGame();
  const { width, height } = useWindowSize();

  let roundupMessage = "Onto the next round!";
  if (state.winnerId === state.ownId) {
    roundupMessage = "You are the winner!";
  } else if (state.winnerId !== state.ownId && state.czar !== state.ownId) {
    roundupMessage = "Maybe next time...";
  }

  return (
    <PageContainer className="flex justify-center items-center flex-col h-screen text-center">
      <h2 className="text-xl font-bold mb-3">{roundupMessage}</h2>

      {state.czar === state.ownId ? (
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
      ) : (
        <p className="text-zinc-500 font-medium mb-3">
          Waiting for the czar to start the next round...
        </p>
      )}
      <BottomBar />

      {state.winnerId === state.ownId && (
        <Confetti width={width} height={height} />
      )}
    </PageContainer>
  );
}

export default Roundup;
