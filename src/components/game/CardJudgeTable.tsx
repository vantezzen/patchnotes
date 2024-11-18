import useGame from "@/lib/game/useGame";
import React from "react";
import { Card, CardDescription } from "../ui/card";
import WordSnippet from "./WordSnippet";
import { Button } from "../ui/button";
import { Crown } from "lucide-react";

function CardJudgeTable({
  onWinnerSelect = () => {},
}: {
  onWinnerSelect?: (playerId: string) => void;
}) {
  const { state } = useGame();
  const isCzar = state.czar === state.ownId;

  return (
    <>
      <Card className="p-6">
        <CardDescription>{state.prompt}</CardDescription>
      </Card>

      <div className="grid gap-6 my-6">
        {Object.keys(state.playedCards).map((playerId) => (
          <div
            key={playerId}
            className="flex justify-between border-b border-zinc-200 py-6"
          >
            <div className="flex gap-3 flex-wrap">
              {state.playedCards[playerId].map((card, i) => (
                <WordSnippet key={card + i}>{card}</WordSnippet>
              ))}
            </div>

            {isCzar && (
              <Button
                onClick={() => {
                  onWinnerSelect(playerId);
                }}
              >
                <Crown size={24} />
              </Button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default CardJudgeTable;
