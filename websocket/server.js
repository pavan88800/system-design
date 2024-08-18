const express = require("express");
const app = express();
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const { join } = require("node:path");

const port = process.env.PORT || 7000;
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  console.log(req.query, "req.query");
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("Connected...");

  socket.on("chat message", (msg) => {
    console.log("received message", msg);

    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
server.listen(port, () => {
  console.log(`Server running on port ${port} 🔥`);
});
