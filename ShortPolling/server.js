const express = require("express");
const app = express();

const port = process.env.PORT || 7000;

let data = "Initial Data";
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// To getData
app.get("/getData", (req, res) => {
  res.status(200).json({
    statusCode: 200,
    data: data
  });
});

// This for only example in production use [PUT, PATCH]
app.get("/updateData", (req, res) => {
  let updateData = "update asdasdnew Data";
  data = updateData;
  res.status(200).json({
    statusCode: 200,
    data: data
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port} 🔥`);
});
