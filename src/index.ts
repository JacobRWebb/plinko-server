import Express from "express";
import http from "http";

const app = Express();
const server = http.createServer(app);
const PORT = Number.parseInt(process.env.PORT, 10) || 3000;

app.use("*", (req, res) => {
  res.send("API Endpoint");
});

server.listen(PORT, () => {
  console.log(`NodeJS Server is running on http://localhost:${PORT}`);
});
