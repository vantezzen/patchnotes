import { Button } from "@/components/ui/button";
import { GameEventType } from "@/lib/game/gameEvent";
import useGame from "@/lib/game/useGame";
import React from "react";
import WordSnippet from "../WordSnippet";
import PhaseEndTimer from "../PhaseEndTimer";
import BottomBar from "../BottomBar";
import PageContainer from "../PageContainer";
import { toast } from "sonner";
import { getWordList } from "@/lib/game/utils";
import PromptCard from "../PromptCard";
import { useIsDemoGame } from "@/lib/game/useIsDemoGame";
import { Input } from "@/components/ui/input";

function SelectingCards() {
  const { state, trigger } = useGame();
  const [selectedCards, setSelectedCards] = React.useState<string[]>([]);
  const [isConfirmed, setIsConfirmed] = React.useState(false);

  const isDemoGame = useIsDemoGame();
  const [hasSelectedDemoCards, setHasSelectedDemoCards] = React.useState(false);

  let remainingCards = [...state.ownCards];
  for (const card of selectedCards) {
    const firstItem = remainingCards.findIndex((c) => c === card);
    remainingCards = remainingCards.filter((_value, i) => i !== firstItem);
  }

  return (
    <PageContainer>
      <h2 className="text-xl font-bold mb-3">Your prompt is:</h2>

      <PromptCard prompt={state.prompt!} />

      <h2 className="text-xl font-bold my-6">Your answer</h2>

      {isDemoGame && !hasSelectedDemoCards && (
        <div className="flex gap-3">
          <Input
            type="text"
            placeholder="Enter your answer here"
            className="w-full"
            onChange={(e) => setSelectedCards(e.target.value.split(" "))}
          />
          <Button
            onClick={() => {
              setHasSelectedDemoCards(true);
            }}
          >
            OK
          </Button>
        </div>
      )}

      <div className="flex gap-3 flex-wrap">
        {selectedCards.map((card, i) => (
          <WordSnippet
            key={card + i}
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

      <div className="flex gap-3 flex-wrap max-h-[300px] overflow-y-auto overflow-x-hidden">
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

          let ownCards = remainingCards;
          if (ownCards.length < 40) {
            ownCards = getWordList();
            toast("Your cards are running low - you have received new cards!");
          }
          state.updateState({
            ownCards,
          });
        }}
        disabled={isConfirmed || selectedCards.length === 0}
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
