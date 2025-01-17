import { GameEventType } from "@/lib/game/gameEvent";
import useGame from "@/lib/game/useGame";
import React from "react";
import BottomBar from "../BottomBar";
import PageContainer from "../PageContainer";
import CardJudgeTable from "../CardJudgeTable";
import { trackEvent } from "@/lib/analytics";
import JudgeCards from "../judging/JudgeCards";
import tieImage from "@/assets/cats/tie.png";
import Image from "next/image";

function Judging() {
  const { trigger, state } = useGame();

  return (
    <PageContainer>
      <JudgeCards>
        <Image
          src={tieImage}
          alt="Patch Notes"
          width={150}
          height={150}
          className="mb-6 mx-auto"
        />

        <h2 className="text-xl font-bold mb-3">Now it's up to you...</h2>
        <p className="text-zinc-500 font-medium mb-3">
          Who gave the best answer? Crown the best answer!
        </p>

        <CardJudgeTable
          onWinnerSelect={(playerId) => {
            trackEvent("round_winner");
            const updatedPoints = {
              ...state.playerPoints,
              [playerId]: (state.playerPoints[playerId] || 0) + 1,
            };

            trigger({
              type: GameEventType.RoundEnd,
              payload: {
                winnerId: playerId,
                playerPoints: updatedPoints,
              },
            });
          }}
        />

        <BottomBar />
      </JudgeCards>
    </PageContainer>
  );
}

export default Judging;
