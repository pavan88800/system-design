const express = require("express");
const app = express();

const port = process.env.PORT || 7000;
const holdRequest = [];
app.listen(port, () => {
  console.log(`Server running on port ${port} 🔥`);
});

let data = "Initial Data";
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// To getData
app.get("/getData", (req, res) => {
  let lastData = req.query.data;
  if (data !== lastData) {
    res.json({
      data
    });
  } else {
    holdRequest.push(res);
  }
});

// This for only example in production use [PUT, PATCH]
app.get("/updateData", (req, res) => {
  let updateData = req.query.data;
  data = updateData;
  while (holdRequest.length > 0) {
    let client = holdRequest.pop();
    client.status(200).json({
      data: data
    });
    res.json(data);
  }
});
