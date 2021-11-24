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
        markup += `<p><b>${i + 1}. ${q.stem}</b></p>`;

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
      }

      // Submit button
      markup += `<button style="margin-top: 1rem">Submit</button>
                </form>`;

      // Set the quiz-container div's html to the markup we created
      $("#quiz-container").html(markup);

      $(`input[type="radio"]`).change(function () {
        if ($(this).is(":checked")) {
          let answerReq = new XMLHttpRequest();
          answerReq.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
              let result = this.responseText;
              alert(result);
            }
          };

          let optionObj = {
            id: this.id,
          };
          let jsonObj = JSON.stringify(optionObj);
          answerReq.open("POST", "/check", true);
          answerReq.setRequestHeader("Content-Type", "application/json");
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
