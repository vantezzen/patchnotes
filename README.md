# Patch Notes

Craft the Craziest Phrases from Scattered Words!

- Repository: https://github.com/vantezzen/patchnotes
- Live: https://patchnotes.vantezzen.io

## Development

1. Clone the repository

```bash
git clone https://github.com/vantezzen/patchnotes
cd patchnotes
```

2. Make sure you have NodeJS >= 22 and npm installed
3. Install dependencies

```bash
npm install
```

4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

For development, you can use <http://localhost:3000/multi> for running multiple instances at once, instead of opening multiple tabs.

## Usage

Patch Notes is a multiplayer online card game where players have to craft the craziest phrases from word snippets. The game is played in rounds where players have to create a phrase from a set of words. Each round, a czar is selected to determine who has the best, most creative or funny answer.

To start a game, open the homepage and click on "New Lobby". Share the lobby code or URL with other people so they can join the game. Alternatively, for development, you can use the `/multi` route to run multiple instances at once.

Once everyone is in the lobby, click on "Start Game" to start the game.

In each round, players have to create a phrase from the word snippets they have. Once everyone has submitted their phrase, the czar has to select the best phrase. The player with the most points at the end of the game wins.
