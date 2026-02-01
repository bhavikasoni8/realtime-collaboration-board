import { Response } from "express";
import mongoose from "mongoose";
import Room from "../models/Room";
import Board from "../models/Board";
import { AuthRequest } from "../middleware/auth.midlleware";

export const createRoom = async (req: AuthRequest, res: Response) => {
  try {
    const { name } = req.body;

    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userObjectId = new mongoose.Types.ObjectId(req.userId);

    // 1. Create room first
    const room = await Room.create({
      name,
      members: [userObjectId],
    });

    // 2. Create board linked to room
    const board = await Board.create({
      roomId: room._id.toString(),
      operations: [],
    });

    // 3. Attach board to room
    room.board = board._id;
    await room.save();

    res.status(201).json(room);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Create room failed", err });
  }
};

export const joinRoom = async (req: AuthRequest, res: Response) => {
  try {
    const { roomId } = req.params;

    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userObjectId = new mongoose.Types.ObjectId(req.userId);

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    const isMember = room.members.some(
      (id) => id.toString() === userObjectId.toString()
    );

    if (!isMember) {
      room.members.push(userObjectId);
      await room.save();
    }

    res.json(room);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Join room failed", err });
  }
};

export const getBoardByRoom = async (req: AuthRequest, res: Response) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findById(roomId).populate("board");
    if (!room) return res.status(404).json({ message: "Room not found" });

    res.json(room.board);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Fetch board failed", err });
  }
};
