let xReq = new XMLHttpRequest();

// When the readyState property of the xReq changes, call the displayQuestions function
xReq.onreadystatechange = function () {
  // If the xReq is finished and the status is OK, display the questions
  if (this.readyState == 4 && this.status == 200) {
    // Gets questions from server
    let questions = JSON.parse(this.responseText);

    // When document is ready
    $(document).ready(function () {
      // Variable to keep track of added markup
      let markup = `<form action="/submit" method="post">`;

      // For each question
      for (const [i, q] of questions.entries()) {
        // Add the question stem as bold text
        markup += `
        <div id="question${i + 1}">
          <p><b>${i + 1}. ${q.stem}</b></p>`;

        // For each option for the question
        for (const [num, opt] of q.options.entries()) {
          // Add a radio button and a label
          markup += `
              <input type="radio" value="${opt}" name="q${i + 1}" id="q${
            i + 1
          }a${num + 1}" required>
              <label for="q${i + 1}a${num + 1}">${opt}</label><br>
              `;
        }
        markup += `
          <div id="feedback${i + 1}" style="margin-top: 1rem">
          </div>
        </div>`;
      }

      // Submit button
      markup += `<button style="margin-top: 1rem">Submit</button>
                </form>`;

      // Set the quiz-container div's html to the markup we created
      $("#quiz-container").html(markup);

      // Anytime a radio button is changed
      $(`input[type="radio"]`).change(function () {
        // If it is now checked
        if ($(this).is(":checked")) {
          let curBtn = this;
          // New request for the post request
          let answerReq = new XMLHttpRequest();
          answerReq.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
              // Give feedback to user in the form of an alert
              let result = this.responseText;
              $(`#feedback${curBtn.id[1]}`)
                .html(result)
                .css("color", `${result === "Correct!" ? "Green" : "Red"}`);
            }
          };

          // Object to hold this radio button's id
          let optionObj = {
            id: curBtn.id,
          };

          // Converts this object to be able to send it in the post request
          let jsonObj = JSON.stringify(optionObj);

          // Configuring post request
          answerReq.open("POST", "/check", true);
          answerReq.setRequestHeader("Content-Type", "application/json");
          // Send the json object in the request
          answerReq.send(jsonObj);
        }
      });
    });
  }
};

// GET /questions asynchronously
xReq.open("GET", "/questions", true);

// Send the xReq
xReq.send();
