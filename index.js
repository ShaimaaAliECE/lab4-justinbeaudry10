const express = require("express");
const questions = require("./questions.json");

const app = express();

// Serve static contents
app.use(express.static("static"));

app.get("/questions", (req, res) => {
  // Converts json object to string and sends as response
  res.json(questions);
});

// Port 80
app.listen(80);
