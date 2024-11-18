import React from "react";
import PageContainer from "../PageContainer";
import CardJudgeTable from "../CardJudgeTable";
import BottomBar from "../BottomBar";

function WaitingForJudge() {
  return (
    <PageContainer>
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
