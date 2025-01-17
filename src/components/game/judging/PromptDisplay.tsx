import React from "react";
import PromptCard from "../PromptCard";
import useGame from "@/lib/game/useGame";
import { motion } from "motion/react";
import { useTimeoutFn } from "react-use";

function PromptDisplay({ onDone }: { onDone: () => void }) {
  const { state } = useGame();
  useTimeoutFn(onDone, 4000);

  return (
    <div className="flex items-center justify-center h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PromptCard prompt={state.prompt!} />
      </motion.div>
    </div>
  );
}

export default PromptDisplay;
