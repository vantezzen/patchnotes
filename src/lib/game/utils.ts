import { getRandomArrayElement } from "../utils";
import { GameState } from "./gameState";
import promptsRaw from "./prompts.json";
import wordListRaw from "./words.json"; // https://github.com/first20hours/google-10000-english/blob/master/google-10000-english-usa-no-swears.txt
const wordList = wordListRaw as unknown as string[];
const prompts = promptsRaw as unknown as string[];
const coreWords = [
  "the",
  "a",
  "an",
  "and",
  "or",
  "but",
  "of",
  "to",
  "at",
  "in",
  "on",
  "by",
  "with",
  "oops",
  "sorry",
  "oh",
  "please",
];

export function createRandomLobbyCode() {
  // 4 chracters, 0-9 and A-Z
  const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += characters[Math.floor(Math.random() * characters.length)];
  }
  return code;
}

export function chooseNextCzar(state: GameState) {
  const players = state.players
    .sort(
      // Shuffle so the czar is random - at least for new games until everyone has been czar
      () => Math.random() - 0.5
    )
    .sort(
      // Use state.previousCzars to sort by least recent czar
      (a, b) => state.previousCzars.indexOf(a) - state.previousCzars.indexOf(b)
    );
  return players[0];
}

export function getWordList(entries = 60): string[] {
  const coreWordAmount = entries * 0.3; // 30% of words are core words which seems to make forming sentences easier
  const wordListWordAmount = entries - coreWordAmount;

  return [
    ...Array.from({ length: coreWordAmount }, () =>
      getRandomArrayElement(coreWords)
    ),
    ...Array.from({ length: wordListWordAmount }, () =>
      getRandomArrayElement(wordList)
    ),
  ].sort(() => Math.random() - 0.5);
}

export function getNewPrompt() {
  return getRandomArrayElement(prompts);
}
