const express = require("express");
const questions = require("./questions.json");

const app = express();

// Serve static contents
app.use(express.static("static"));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/questions", (req, res) => {
  // Converts json object to string and sends as response
  res.json(questions);
});

app.post("/submit", (req, res) => {
  // Sets number of questions to the length of the json object
  const numQuestions = questions.length;

  let answers = []; // Array of user answers
  let correct = []; // Array of correct answers (from json object)
  let score = 0; // Keeps count of user's correct answers

  // Loops over each question in json object
  questions.forEach((q) => {
    // Pushes the correct answer's index to the 'correct' array
    correct.push(q["answerIndex"]);
  });

  // Loops over all answers in json object
  // Outer loop loops over each question
  for (let q = 0; q < numQuestions; q++) {
    // Inner loop loops over each option for a given question
    for (let a = 0; a < questions[q]["options"].length; a++) {
      // questions[q]["options"][a]
    }
  }

  let markup = `<p>Grade: ${answers}/${numQuestions}</p>`;
  res.send(markup);
});

// Port 80
app.listen(80);
