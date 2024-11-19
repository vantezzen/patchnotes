import useGame from "@/lib/game/useGame";
import { getUserPlace } from "@/lib/game/utils";
import { ordinate } from "@/lib/utils";
import React from "react";

function BottomBar({ children = <div /> }: { children?: React.ReactNode }) {
  const { state } = useGame();
  const ownPoints = state.playerPoints[state.ownId!] || 0;
  const place = getUserPlace(state.playerPoints, state.ownId!);

  return (
    <div className="fixed bottom-0 w-full left-0 bg-zinc-900 text-white p-3 rounded-t-lg grid grid-cols-3 gap-3 justify-center items-center max-w-xl mx-auto right-0">
      <p className="font-medium text-left">
        <span className="font-bold">{ownPoints}</span>{" "}
        <span className="text-zinc-400">
          {ownPoints === 1 ? "point" : "points"}{" "}
          {place > 0 && <>({ordinate(place)})</>}
        </span>
      </p>
      <p className="font-medium text-center">
        <span className="font-bold">{state.players.length + 1}</span>{" "}
        <span className="text-zinc-400">players</span>
      </p>

      {children}
    </div>
  );
}

export default BottomBar;
