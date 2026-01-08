"use client";

import { useEffect } from "react";
import { socket } from "@/socket";
import { useBoardStore } from "@/store/boardStore";
import { useParams } from "next/navigation";

export default function RoomPage() {
  const { roomId } = useParams() as { roomId: string };

  const { elements, applyOp, syncFromServer, undo, redo } = useBoardStore();

  useEffect(() => {
    socket.connect();
    socket.emit("join-room", { roomId });

    socket.on("board-sync", (ops) => {
      syncFromServer(ops);
    });

    socket.on("board-op", (op) => {
      applyOp(op);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  const addNote = () => {
    const op = {
      id: crypto.randomUUID(),
      type: "ADD" as const,
      payload: {
        id: crypto.randomUUID(),
        type: "note",
        x: 100,
        y: 100,
        text: "Hello",
      },
    };

    socket.emit("board-op", { roomId, operation: op });
    applyOp(op);
  };

  return (
    <div>
      <button onClick={addNote}>Add Note</button>
      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>

      {elements.map((el) => (
        <div
          key={el.id}
          style={{
            position: "absolute",
            left: el.x,
            top: el.y,
            background: "#fffa8b",
            padding: 10,
          }}
        >
          {el.text}
        </div>
      ))}
    </div>
  );
}
