"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RotateCcw } from "lucide-react";
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

      <div className="flex gap-1 h-[800px]">
        {Array.from({ length: amount }).map((_, i) => (
          <div className="flex flex-col bg-gray-100 w-full" key={i}>
            <div className="bg-white shadow-md p-2">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" aria-label="Reload page">
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Input
                  className="flex-grow"
                  type="text"
                  placeholder="Enter URL"
                  value="patchnotes.vantezzen.io/game/CF3G"
                  readOnly
                />
              </div>
            </div>
            <div
              className="flex-grow bg-white m-2 rounded-md shadow-md"
              aria-label="Web page content"
            >
              {loadStart + DELAY_BETWEEN_LOAD_MS * i < Date.now() && (
                <iframe src="/game/cf3g" className="w-full h-full" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MultiPage;
