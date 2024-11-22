"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useUpdate } from "react-use";

const DELAY_BETWEEN_LOAD_MS = 5000;

function MultiPage() {
  const [amount, setAmount] = React.useState(4);
  const [loadStart, setLoadStart] = React.useState(() => new Date().getTime());

  const update = useUpdate();
  React.useEffect(() => {
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="flex items-center p-3 mx-auto max-w-xs gap-3">
        <Label>Players</Label>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />

        <Button onClick={() => setLoadStart(Date.now())}>Load</Button>
      </div>

      <div className="flex gap-1 h-[90vh]">
        {Array.from({ length: amount }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-center h-full bg-card rounded-lg w-full p-6"
          >
            {loadStart + DELAY_BETWEEN_LOAD_MS * i < Date.now() && (
              <iframe src="/game/cf3g" className="w-full h-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MultiPage;
