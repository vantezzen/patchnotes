import React from "react";
import PageContainer from "../PageContainer";
import useGame from "@/lib/game/useGame";
import { ordinate } from "@/lib/utils";
import BottomBar from "../BottomBar";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

function GameEnd() {
  const { state } = useGame();
  const { width, height } = useWindowSize();

  const place =
    Object.entries(state.playerPoints)
      .sort((a, b) => b[1] - a[1])
      .findIndex(([id]) => id === state.ownId) + 1;

  return (
    <PageContainer className="flex justify-center items-center flex-col h-screen text-center">
      <h2 className="text-xl font-bold mb-3">
        {place}
        <span className="text-sm text-zinc-500">{ordinate(place)}</span>
      </h2>

      <p className="text-zinc-500 font-medium mb-3">
        You got {state.playerPoints[state.ownId!]}{" "}
        {state.playerPoints[state.ownId!] === 1 ? "point" : "points"} which puts
        you in {place}
        {ordinate(place)} place!
      </p>

      <BottomBar />

      {place === 1 && <Confetti width={width} height={height} />}
    </PageContainer>
  );
}

export default GameEnd;
