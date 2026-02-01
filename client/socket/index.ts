import { io } from "socket.io-client";
import { getToken } from "@/lib/auth";

export const socket = io("http://localhost:8080", {
  autoConnect: false,
  auth: {
    token: getToken(),
  },
});
