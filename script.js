import { questions } from "./quiz.js";

// Variables
let questionTitle = document.querySelector(".jsQuestionTitle");
let questionNumber = document.querySelector(".jsQuestionNumber");
let nextButton = document.querySelector(".jsNextButton");
let questionResult = document.querySelector(".jsQuestionResult");
let options = document.querySelectorAll(".jsOption");
let option1 = document.querySelector(".jsOption1");
let option2 = document.querySelector(".jsOption2");
let option3 = document.querySelector(".jsOption3");
let option4 = document.querySelector(".jsOption4");

// Displays question on page starting on question 1
let questionsIndex = 0;
displayQuestion();
function displayQuestion() {
  questionTitle.textContent = questions[questionsIndex].title;
  option1.textContent = questions[questionsIndex].option1;
  option2.textContent = questions[questionsIndex].option2;
  option3.textContent = questions[questionsIndex].option3;
  option4.textContent = questions[questionsIndex].option4;
  questionNumber.textContent = `Question ${questionsIndex + 1} of 10`;
}

// Next button moves to next quiz question
// let hasChosen = false;
// function nextQuestion() {
//   if (hasChosen) {
//     questionsIndex++;
//     displayQuestion();
//   }
// }

// If hasChosen is false then let the user make a choice
let hasChosen = false;
options.forEach((option) => {
  option.addEventListener("click", () => {
    if (!hasChosen) {
      if (option.textContent === questions[questionsIndex].correctAnswer) {
        option.classList.add("correct");
        questionResult.textContent = "Correct answer";
        questionResult.classList.add("question-result-correct");
      } else {
        option.classList.add("wrong");
        questionResult.textContent = "Wrong answer";
        questionResult.classList.add("question-result-wrong");
        options.forEach((option) => {
          if (option.textContent === questions[questionsIndex].correctAnswer) {
            option.classList.add("correct");
          }
        });
      }
      options.forEach((option) => {
        option.classList.remove("hover");
      });
      hasChosen = true;
    }
  });
});
