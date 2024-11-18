import LoadingScreen from "@/components/LoadingScreen";
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useGameState } from "./gameState";
import debugging from "debug";
import { GameEvent, handleEvent } from "./gameEvent";
const debug = debugging("game:socket");

const socketContext = createContext<Socket | null>(null);
export default socketContext;

export function useSocket() {
  const socket = useContext(socketContext);
  if (!socket) {
    throw new Error("usesocket must be used within a SocketProvider");
  }
  return socket;
}

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const gameState = useGameState();

  // Create a new socket when the component mounts
  useEffect(() => {
    debug("Creating new socket");
    const newSocket = io();
    setSocket(newSocket);
    newSocket.on("connect", () => {
      debug("Connected to server");
      gameState.updateState({ ownId: newSocket.id });
    });

    return () => {
      debug("Disconnecting socket");
      newSocket.disconnect();
    };
  }, []);

  // Join the game when the game ID is set
  useEffect(() => {
    if (!socket) {
      debug("Socket not ready, skipping join");
      return;
    }

    debug("Joining game");
    socket.emit("join", gameState.gameId);

    return () => {
      debug("Leaving game");
      socket.emit("leave", gameState.gameId);
    };
  }, [socket, gameState.gameId]);

  // Handle incoming events
  useEffect(() => {
    if (!socket) {
      debug("Socket not ready, skipping event handling");
      return;
    }

    const handler = (event: GameEvent) => {
      debug("Received game event", event);
      handleEvent(event, gameState);
    };

    socket.on("gameEvent", handler);

    return () => {
      socket.off("gameEvent", handler);
    };
  }, [socket, gameState]);

  return (
    <socketContext.Provider value={socket}>
      {socket ? (
        children
      ) : (
        <LoadingScreen>Connecting to server...</LoadingScreen>
      )}
    </socketContext.Provider>
  );
}
