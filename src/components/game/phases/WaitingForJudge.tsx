import React from "react";
import PageContainer from "../PageContainer";
import CardJudgeTable from "../CardJudgeTable";
import BottomBar from "../BottomBar";

import likeImage from "@/assets/cats/like.png";
import Image from "next/image";

function WaitingForJudge() {
  return (
    <PageContainer>
      <Image
        src={likeImage}
        alt="Patch Notes"
        width={150}
        height={150}
        className="mb-6 mx-auto"
      />

      <h2 className="text-xl font-bold mb-3">Waiting for czar...</h2>
      <p className="text-zinc-500 font-medium mb-3">
        The czar is judging the answers - let's see who is the funniest!
      </p>

      <CardJudgeTable />

      <BottomBar />
    </PageContainer>
  );
}

export default WaitingForJudge;
