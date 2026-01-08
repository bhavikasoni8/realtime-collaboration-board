import { Server } from "socket.io";
import Board from "../models/Board";

export const setupSocket = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("🟢 Connected:", socket.id);

    socket.on("join-room", async ({ roomId }) => {
      socket.join(roomId);

      const board = await Board.findOne({ roomId });
      socket.emit("board-sync", board?.operations || []);
    });

    socket.on("board-op", async ({ roomId, operation }) => {
      try {
        const board = await Board.findOne({ roomId });
        if (!board) return;

        board.operations.push(operation);
        await board.save();

        socket.to(roomId).emit("board-op", operation);
      } catch (err) {
        console.error("Board op failed:", err);
      }
    });
  });
};
