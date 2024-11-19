import React, { useState } from "react";
import { Button } from "../ui/button";
import { randomBetween } from "@/lib/utils";
import { X } from "lucide-react";
import Serif from "../Serif";

function WordSnippet({
  children,
  onClick = () => {},
  allowRemove = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  allowRemove?: boolean;
}) {
  const [rotation] = useState(() => randomBetween(-5, 5));

  return (
    <Button
      className="bg-white hover:bg-zinc-50 text-black rounded-none flex items-center justify-center"
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
      onClick={onClick}
    >
      <Serif>{children}</Serif>

      {allowRemove && <X size={14} />}
    </Button>
  );
}

export default WordSnippet;
