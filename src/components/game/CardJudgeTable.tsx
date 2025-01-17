import useGame from "@/lib/game/useGame";
import React from "react";
import WordSnippet from "./WordSnippet";
import { Button } from "../ui/button";
import { Crown } from "lucide-react";
import PromptCard from "./PromptCard";
import { motion } from "motion/react";

function CardJudgeTable({
  onWinnerSelect = () => {},
}: {
  onWinnerSelect?: (playerId: string) => void;
}) {
  const { state } = useGame();
  const isCzar = state.czar === state.ownId;

  return (
    <>
      <PromptCard prompt={state.prompt!} />

      <div className="grid gap-6 my-6">
        {Object.keys(state.playedCards).map((playerId, index) => (
          <motion.div
            key={playerId}
            className="flex justify-between border-b border-zinc-200 py-6"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
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
          </motion.div>
        ))}
      </div>
    </>
  );
}

export default CardJudgeTable;
