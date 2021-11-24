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

app.use(express.json());

// Gets questions from json object
app.get("/questions", (req, res) => {
  // Converts json object to string and sends as response
  res.json(questions);
});

// Checks answer for current question
app.post("/check", (req, res) => {
  const question = req.body;

  res.send(question);
});

// Submits quiz answers
app.post("/submit", (req, res) => {
  // Sets number of questions to the length of the json object
  const numQuestions = questions.length;

  let correct = []; // Array of correct answers (from json object)
  let score = 0; // Keeps count of user's correct answers

  // Loops over each question in json object
  questions.forEach((q) => {
    // Pushes the correct answer's index to the 'correct' array
    correct.push(q["answerIndex"]);
  });

  // Loops over all questions
  for (let q = 0; q < numQuestions; q++) {
    // If the selected radio button's name is equal to the name of the correct answer (which is identified by its index from the correct array)
    if (req.body[`q${q + 1}`] === questions[q]["options"][correct[q]]) score++;
  }

  // Markup to display user's score
  let markup = `<p>Grade: ${score}/${numQuestions}</p>`;
  res.send(markup);
});

// Port 80
app.listen(80);
