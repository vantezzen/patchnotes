import Link from "next/link";
import Serif from "../Serif";
import { Button } from "../ui/button";
import { createRandomLobbyCode } from "@/lib/game/utils";
import Image, { StaticImageData } from "next/image";


export default function HowToPlay() {
  return (
    <div className="mt-32 max-w-4xl mx-auto">
      <Serif>
        <h2 className="text-4xl font-bold mb-12 text-center">How to Play</h2>
      </Serif>

      <div className="grid gap-12">
        <Step
          number={1}
          title="Gather Your Crew"
          description="Share your lobby code with friends. Everyone joins the same game room to start the fun!"
        />

        <Step
          number={2}
          title="Meet the Czar"
          description="Each round, one player becomes the Czar - the all-powerful judge of creativity and humor!"
        />

        <Step
          number={3}
          title="Face the Prompt"
          description="Your round get's a random prompt! Something like 'Explain to your boss why you're dressed as a pirate during a Zoom call' or 'Convince a bear to share their picnic basket'"
        />

        <Step
          number={4}
          title="Craft Your Masterpiece"
          description="Using your collection of random word cards, piece together the most hilarious response you can think of. Be creative, be silly, be YOU! But don't get too cast away - you only have 2 minutes!"
        />

        <Step
          number={5}
          title="Crown the Winner"
          description="The Czar picks their favorite answer, and the genius behind it gets a point! More rounds = more chances to show off your wordsmithing skills!"
        />

        <Step
          number={6}
          title="Rinse and Repeat"
          description="Keep playing rounds with new prompts and new Czars to gather more points!"
        />
      </div>

      <div className="mt-12 text-center">
        <Link href={`/game/${createRandomLobbyCode()}`}>
          <Button size="lg" className="text-lg px-8">
            Create a new lobby
          </Button>
        </Link>
      </div>
    </div>
  );
}

function Step({
  number,
  title,
  description,
  image,
}: {
  number: number;
  title: string;
  description: string;
  image?: StaticImageData;
}) {
  return (
    <div className="flex gap-8 items-center">
      <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
        <Serif>
          <span className="text-2xl font-bold">{number}</span>
        </Serif>
      </div>

      <div className="flex-1">
        <Serif>
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
        </Serif>
        <p className="text-zinc-600">{description}</p>
      </div>

      {image && (
        <div className="w-1/3 aspect-video rounded-xl overflow-hidden bg-zinc-100">
          <Image src={image} alt="" />
        </div>
      )}
    </div>
  );
}
