import React from "react";
import PromptDisplay from "./PromptDisplay";
import Presentation from "./Presentation";

enum JudgePhase {
  PromptDisplay,
  Presentation,
  Judging,
}

function JudgeCards({ children }: { children?: React.ReactNode }) {
  const [phase, setPhase] = React.useState(JudgePhase.PromptDisplay);

  if (phase === JudgePhase.PromptDisplay) {
    return <PromptDisplay onDone={() => setPhase(JudgePhase.Presentation)} />;
  }
  if (phase === JudgePhase.Presentation) {
    return <Presentation onDone={() => setPhase(JudgePhase.Judging)} />;
  }
  if (phase === JudgePhase.Judging) {
    return <>{children}</>;
  }
}

export default JudgeCards;
