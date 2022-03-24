import Express from "express";
import http from "http";
import { Server } from "socket.io";

const app = Express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    credentials: true,
    methods: ["GET", "POST"],
  },
  transports: ["websocket"],
});
const PORT = Number.parseInt(process.env.PORT, 10) || 3000;

io;

app.use("*", (req, res) => {
  res.send("API Endpoint");
});

server.listen(PORT, () => {
  console.log(`NodeJS Server is running on http://localhost:${PORT}`);
});
