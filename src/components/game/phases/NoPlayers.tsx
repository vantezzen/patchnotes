import React from "react";
import PageContainer from "../PageContainer";
import useGame from "@/lib/game/useGame";
import BottomBar from "../BottomBar";
import Serif from "@/components/Serif";

import lonelyImage from "@/assets/cats/lonely.png";
import Image from "next/image";

function NoPlayers() {
  const { state } = useGame();

  return (
    <PageContainer className="flex justify-center items-center flex-col h-screen text-center">
      <Image
        src={lonelyImage}
        alt="Patch Notes"
        width={150}
        height={150}
        className="mb-6"
      />

      <h2 className="text-xl font-bold mb-3">1 is the loneliest number...</h2>

      <p className="text-zinc-500 font-medium mb-3">
        You're the only one in this lobby. Maybe ask some friends to join the
        lobby?
      </p>

      <Serif>
        <h2 className="text-3xl font-bold mt-3 mb-3 text-center">
          {state.gameId}
        </h2>
      </Serif>

      <BottomBar />
    </PageContainer>
  );
}

export default NoPlayers;
