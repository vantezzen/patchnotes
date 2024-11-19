import { Card, CardDescription } from "@/components/ui/card";
import { GameEventType } from "@/lib/game/gameEvent";
import useGame from "@/lib/game/useGame";
import React, { useEffect } from "react";
import PhaseEndTimer from "../PhaseEndTimer";
import BottomBar from "../BottomBar";
import PageContainer from "../PageContainer";
import PromptCard from "../PromptCard";

import tieImage from "@/assets/cats/tie.png";
import Image from "next/image";

function WaitingForCards() {
  const { state, trigger } = useGame();

  useEffect(() => {
    if (Object.keys(state.playedCards).length === state.players.length) {
      // All players have played their cards
      // Move to the next phase
      trigger({
        type: GameEventType.StartJudging,
        payload: null,
      });
    }
  }, [state.playedCards]);

  return (
    <PageContainer>
      <Image
        src={tieImage}
        alt="Patch Notes"
        width={150}
        height={150}
        className="mb-6 mx-auto"
      />

      <h2 className="text-xl font-bold mb-3">You are the czar!</h2>
      <h2 className="text-zinc-500 font-medium mb-3">
        You will be choosing a winner based on this prompt:
      </h2>

      <PromptCard prompt={state.prompt!} />

      <h2 className="text-zinc-500 font-medium my-3">
        Waiting for players to play their cards...
      </h2>

      <BottomBar>
        <PhaseEndTimer
          onPhaseEnd={() => {
            if (Object.keys(state.playedCards).length === 0) {
              // No player has played any cards - just move to the roundup
              trigger({
                type: GameEventType.RoundEnd,
                payload: "none",
              });
            } else {
              trigger({
                type: GameEventType.StartJudging,
                payload: null,
              });
            }
          }}
        />
      </BottomBar>
    </PageContainer>
  );
}

export default WaitingForCards;
