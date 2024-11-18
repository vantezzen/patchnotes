import React, { useEffect } from "react";
import { useUpdate } from "react-use";

function PhaseEndTimer({ onPhaseEnd = () => {} }: { onPhaseEnd?: () => void }) {
  const [phaseEnd] = React.useState(() => Date.now() + 1000 * 60 * 2);
  const update = useUpdate();

  useEffect(() => {
    const interval = setInterval(() => {
      update();

      if (Date.now() >= phaseEnd) {
        onPhaseEnd();
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutesLeft = Math.floor((phaseEnd - Date.now()) / 1000 / 60);
  const secondsLeft = Math.floor((phaseEnd - Date.now()) / 1000) % 60;

  return (
    <div className="tabular-nums text-lg text-right">
      {minutesLeft}:{secondsLeft.toString().padStart(2, "0")}
    </div>
  );
}

export default PhaseEndTimer;
