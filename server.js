import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const games = {}; // { gameId: { players: [socketId, socketId] } }
const players = {}; // { socketId: { gameId } }

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log(`#${socket.id} connected`);

    socket.on("join", (gameId) => {
      if (!games[gameId]) {
        games[gameId] = { players: [] };
      }

      games[gameId].players.push(socket.id);
      players[socket.id] = { gameId };

      // Inform the other players about the new player
      socket.to(gameId).emit("gameEvent", {
        type: "playerJoin",
        payload: socket.id,
      });

      socket.join(gameId);

      console.log(`#${socket.id} joined @${gameId}`);
    });

    socket.on("gameEvent", (event, gameId) => {
      console.log(`gameEvent @${gameId} ->`, event);
      socket.to(gameId).emit("gameEvent", event);
    });

    socket.on("disconnect", () => {
      console.log(`#${socket.id} disconnected`);
      const { gameId } = players[socket.id];

      if (gameId) {
        console.log(`#${socket.id} left @${gameId}`);
        const game = games[gameId];
        game.players = game.players.filter((player) => player !== socket.id);

        if (game.players.length === 0) {
          delete games[gameId];
        }

        socket.to(gameId).emit("gameEvent", {
          type: "playerLeave",
          payload: socket.id,
        });
      }

      delete players[socket.id];
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
