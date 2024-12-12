import { useParams } from "next/navigation";

export function useIsDemoGame() {
  const { gameId } = useParams();

  return gameId === "DEMOGAME";
}
