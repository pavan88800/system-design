const express = require("express");
const app = express();
const { join } = require("node:path");

const port = process.env.PORT || 7000;

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

app.get("/sse", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Connection", "keep-live");
  res.setHeader("Cache-Control", "no-cache");

  res.write("Data: Welcome to server sent event \n\n");

  let intervalId = setInterval(() => {
    res.write(`data: Server Time ${new Date().toLocaleDateString()} \n\n`);
  }, 5000);

  req.on("close", () => {
    clearInterval(intervalId);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port} 🔥`);
});
