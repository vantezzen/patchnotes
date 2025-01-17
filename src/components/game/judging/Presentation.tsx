import React, { useEffect } from "react";
import PromptCard from "../PromptCard";
import useGame from "@/lib/game/useGame";
import { motion } from "motion/react";

function Presentation({ onDone = () => {} }: { onDone: () => void }) {
  const { state } = useGame();

  const [currentPlayer, setCurrentPlayer] = React.useState(
    Object.keys(state.playedCards)[0]
  );

  const words = state.playedCards[currentPlayer];

  // Advance to next player
  useEffect(() => {
    const nextTimeout = setTimeout(() => {
      // Last player
      if (currentPlayer === Object.keys(state.playedCards).pop()) {
        onDone();
        return;
      }

      setCurrentPlayer((prev) => {
        const currentIndex = Object.keys(state.playedCards).indexOf(prev);
        return Object.keys(state.playedCards)[currentIndex + 1];
      });
    }, words.length * 200 + 3000);

    return () => clearTimeout(nextTimeout);
  }, [currentPlayer, state.playedCards, words.length, onDone]);

  return (
    <div className="flex items-center justify-center flex-wrap gap-3">
      {words.map((word, i) => (
        <motion.div
          key={word + i + currentPlayer}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: i * 0.2 }}
        >
          <PromptCard prompt={word} />
        </motion.div>
      ))}
    </div>
  );
}

export default Presentation;
