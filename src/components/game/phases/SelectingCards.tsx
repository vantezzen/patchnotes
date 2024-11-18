import { Button } from "@/components/ui/button";
import { GameEventType } from "@/lib/game/gameEvent";
import useGame from "@/lib/game/useGame";
import React from "react";
import WordSnippet from "../WordSnippet";
import { Card, CardDescription } from "@/components/ui/card";
import PhaseEndTimer from "../PhaseEndTimer";
import BottomBar from "../BottomBar";
import PageContainer from "../PageContainer";
import { toast } from "sonner";

function SelectingCards() {
  const { state, trigger } = useGame();
  const [selectedCards, setSelectedCards] = React.useState<string[]>([]);
  const [isConfirmed, setIsConfirmed] = React.useState(false);

  let remainingCards = [...state.ownCards];
  for (const card of selectedCards) {
    const firstItem = remainingCards.findIndex((c) => c === card);
    remainingCards = remainingCards.filter((_value, i) => i !== firstItem);
  }

  return (
    <PageContainer>
      <h2 className="text-xl font-bold mb-3">Your prompt is:</h2>

      <Card className="p-6">
        <CardDescription>{state.prompt}</CardDescription>
      </Card>

      <h2 className="text-xl font-bold my-6">Your answer</h2>

      <div className="flex gap-3 flex-wrap">
        {selectedCards.map((card) => (
          <WordSnippet
            key={card}
            allowRemove
            onClick={() => {
              setSelectedCards((cards) => cards.filter((c) => c !== card));
            }}
          >
            {card}
          </WordSnippet>
        ))}
      </div>

      {selectedCards.length === 0 && (
        <p className="text-zinc-400 font-medium mb-3 text-sm">
          Click on the words below to select them as your answer
        </p>
      )}

      <h2 className="text-xl font-bold my-6">Your cards</h2>

      <div className="flex gap-3 flex-wrap max-h-[300px] overflow-auto">
        {remainingCards.map((card, i) => (
          <WordSnippet
            key={card + i}
            onClick={() => {
              setSelectedCards((cards) => [...cards, card]);
            }}
          >
            {card}
          </WordSnippet>
        ))}
      </div>

      <Button
        onClick={() => {
          trigger({
            type: GameEventType.PlayerCards,
            payload: {
              id: state.ownId,
              cards: selectedCards,
            },
          });
          setIsConfirmed(true);

          toast("Your cards have been submitted! Waiting for other players...");
        }}
        disabled={isConfirmed}
        className="w-full mt-6"
      >
        Confirm
      </Button>

      <BottomBar>
        <PhaseEndTimer />
      </BottomBar>
    </PageContainer>
  );
}

export default SelectingCards;
