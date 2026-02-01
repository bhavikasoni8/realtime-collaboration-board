"use client";

import { useEffect, useRef, useState } from "react";
import { socket } from "@/socket";
import { useBoardStore } from "@/store/boardStore";
import { useParams } from "next/navigation";
import BoardCanvas from "@/components/BoardCanvas";
import { BoardOperation } from "@/types/board";
import RoomHeader from "@/components/room/RoomHeader";
import BoardBackground from "@/components/room/BoardBackground";
import FloatingHelpButton from "@/components/shared/FloatingHelpButton";

export default function RoomPage() {
  const { roomId } = useParams() as { roomId: string };
  const { applyOp, syncFromServer, undo, elements, setPresence } =
    useBoardStore();
  const [isConnected, setIsConnected] = useState(false);
  const [collaborators, setCollaborators] = useState(0);
  const [copied, setCopied] = useState(false);
  const lastEmitRef = useRef(0);

  useEffect(() => {
    socket.connect();
    socket.emit("join-room", { roomId });

    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));

    socket.on("board-sync", (ops) => {
      syncFromServer(ops);
    });

    socket.on("board-op", (op) => {
      applyOp(op);
    });

    socket.on("collaborators-update", (count) => {
      setCollaborators(count);
    });

    socket.on("presence-update", (presence) => {
      setPresence(presence);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("board-sync");
      socket.off("board-op");
      socket.off("collaborators-update");
      socket.off("presence-update");
      socket.disconnect();
    };
  }, [roomId, applyOp, syncFromServer]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const now = Date.now();

    if (now - lastEmitRef.current < 40) return;

    lastEmitRef.current = now;

    socket.emit("cursor-move", {
      roomId,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const addNote = () => {
    const colors = ["#FFF59D", "#A5D6A7", "#90CAF9", "#FFAB91", "#CE93D8"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const op: BoardOperation = {
      id: crypto.randomUUID(),
      type: "ADD",
      payload: {
        id: crypto.randomUUID(),
        type: "note",
        x: Math.random() * 300 + 100,
        y: Math.random() * 200 + 100,
        text: "New Note",
        color: randomColor,
      },
    };

    socket.emit("board-op", { roomId, operation: op });
    applyOp(op);
  };

  const copyRoomLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
      onMouseMove={handleMouseMove}
    >
      <RoomHeader
        roomId={roomId}
        isConnected={isConnected}
        collaborators={collaborators}
        totalNotes={elements.length}
        onUndo={undo}
        onAddNote={addNote}
        onCopyLink={copyRoomLink}
        copied={copied}
      />

      <main className="flex-1 relative overflow-hidden">
        <BoardCanvas roomId={roomId} />
        <BoardBackground />
      </main>

      <FloatingHelpButton />
    </div>
  );
}
