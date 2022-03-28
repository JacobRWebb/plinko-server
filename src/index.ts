import Express from "express";
import http from "http";
import { createClient } from "redis";
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
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const client = createClient({
  url: REDIS_URL,
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.use("*", (req, res) => {
  res.send("API Endpoint");
});

server.listen(PORT, () => {
  console.log(`NodeJS Server is running on http://localhost:${PORT}`);
  client
    .connect()
    .then(() => {
      console.log("Redis is connected");
    })
    .catch((err) => {
      console.log("The server must be connected to a Redis server.");
      console.log(err);
      process.exit();
    });
});
