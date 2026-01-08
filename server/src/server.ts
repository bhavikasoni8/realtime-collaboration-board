import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "./app";
import { connectDB } from "./config/db";
import { Server } from "socket.io";
import { setupSocket } from "./sockets";

import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";

const PORT = process.env.PORT || 8081;

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

const startServer = async () => {
  connectDB();

  // 🔥 Redis setup
  const pubClient = createClient({ url: "redis://localhost:6379" });
  const subClient = pubClient.duplicate();

  await pubClient.connect();
  await subClient.connect();

  io.adapter(createAdapter(pubClient, subClient));

  console.log("✅ Redis adapter connected");

  setupSocket(io);

  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
