import { Button } from "@/components/ui/button";
import { startNewRound } from "@/lib/game/gameEventUtils";
import useGame from "@/lib/game/useGame";
import React from "react";
import BottomBar from "../BottomBar";
import PageContainer from "../PageContainer";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { GameEventType } from "@/lib/game/gameEvent";

import angryImage from "@/assets/cats/angry.png";
import happyImage from "@/assets/cats/strawberry.png";
import sunImage from "@/assets/cats/sun.png";
import Image from "next/image";
import Serif from "@/components/Serif";

function Roundup() {
  const { state, trigger } = useGame();
  const { width, height } = useWindowSize();

  let image = happyImage;
  let roundupMessage = "Onto the next round!";
  if (state.winnerId === state.ownId) {
    image = sunImage;
    roundupMessage = "You are the winner!";
  } else if (state.winnerId !== state.ownId && state.czar !== state.ownId) {
    image = angryImage;
    roundupMessage = "Maybe next time...";
  }

  return (
    <PageContainer className="flex justify-center items-center flex-col h-screen text-center">
      <Image
        src={image}
        alt="Patch Notes"
        width={150}
        height={150}
        className="mb-6"
      />

      <h2 className="text-3xl font-bold mb-3">
        <Serif>{roundupMessage}</Serif>
      </h2>

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
