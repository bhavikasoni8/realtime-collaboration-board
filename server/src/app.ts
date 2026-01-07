import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import roomRoutes from "./routes/room.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => {
  res.send("API running...");
});

app.use("/api/rooms", roomRoutes);
app.use("/api/auth", authRoutes);

export default app;
