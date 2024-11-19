import React, { useState } from "react";
import { Card, CardDescription } from "../ui/card";
import { randomBetween } from "@/lib/utils";
import Serif from "../Serif";

function PromptCard({ prompt }: { prompt: string }) {
  const [rotation] = useState(randomBetween(-3, 3));

  return (
    <Card
      className="p-6"
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <CardDescription className="text-base">
        <Serif>{prompt}</Serif>
      </CardDescription>
    </Card>
  );
}

export default PromptCard;
