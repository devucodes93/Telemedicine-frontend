import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log("New user connected: " + socket.id);
});

export default socket;
