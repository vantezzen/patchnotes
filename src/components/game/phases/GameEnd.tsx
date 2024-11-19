import React from "react";
import PageContainer from "../PageContainer";
import useGame from "@/lib/game/useGame";
import { ordinate } from "@/lib/utils";
import BottomBar from "../BottomBar";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { getUserPlace } from "@/lib/game/utils";

import angryImage from "@/assets/cats/angry.png";
import happyImage from "@/assets/cats/strawberry.png";
import blanketImage from "@/assets/cats/blanket.png";
import Image from "next/image";

function GameEnd() {
  const { state } = useGame();
  const { width, height } = useWindowSize();

  const place = getUserPlace(state.playerPoints, state.ownId!);

  let image = happyImage;
  if (place === 0) {
    image = blanketImage;
  } else if (place > 1) {
    image = angryImage;
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

      <h2 className="text-xl font-bold mb-3">
        {place === 0 ? "Maybe next time..." : ordinate(place)}
      </h2>

      <p className="text-zinc-500 font-medium mb-3">
        You got {state.playerPoints[state.ownId!] ?? "no"}{" "}
        {state.playerPoints[state.ownId!] === 1 ? "point" : "points"} which puts
        you in {place === 0 ? "last" : ordinate(place)} place!
      </p>

      <BottomBar />

      {place === 1 && <Confetti width={width} height={height} />}
    </PageContainer>
  );
}

export default GameEnd;
