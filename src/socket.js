import { io } from "socket.io-client";

const socket = io("https://telemedicine-backend-2.onrender.com");

socket.on("connect", () => {
  console.log("New user connected: " + socket.id);
});

export default socket;
