const express = require("express");
const questions = require("./questions.json");

const app = express();

// Serve static contents
app.use(express.static("static"));

// Needed to post form data
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Needed to post json objects
app.use(express.json());

// Gets questions from json object
app.get("/questions", (req, res) => {
  // Converts json object to string and sends as response
  res.json(questions);
});

// Checks answer for current question
app.post("/check", (req, res) => {
  // Format of selection: q#a#
  const selection = req.body["id"];
  // Takes the 2nd character as the question number, convert to number
  const question = +selection[1];
  // Takes the 4th character as the answer number, convert to number
  const answer = +selection[3];

  let result =
    questions[question - 1]["answerIndex"] === answer - 1
      ? "Correct!"
      : "Incorrect";

  res.send(result);
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
  let markup = `
    <div style="padding: 1rem; border: 5px solid black; border-radius: 2rem; background-color: lightgray">
      <h1>Grade:</h1>
      <p>${score} points out of a possible ${numQuestions}</p>
    </div>`;
  res.send(markup);
});

// Port 80
app.listen(80);
