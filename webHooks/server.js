const express = require("express");
const app = express();
const { join } = require("node:path");

const port = process.env.PORT || 7000;

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port} 🔥`);
});
