import { io } from "socket.io-client";

export const socket = io("http://localhost:8000");

socket.on("connect", () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});
