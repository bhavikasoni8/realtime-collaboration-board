import { Router } from "express";
import {
  createRoom,
  getBoardByRoom,
  joinRoom,
} from "../controllers/room.controller";
import { authMiddleware } from "../middleware/auth.midlleware";

const router = Router();

router.post("/", authMiddleware, createRoom);
router.post("/:roomId/join", authMiddleware, joinRoom);
router.get("/:roomId/board", authMiddleware, getBoardByRoom);

export default router;
