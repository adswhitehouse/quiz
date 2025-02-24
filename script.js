// Import questions data
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
let playAgain = document.querySelector(".jsPlayAgain");

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

// Next button moves to next quiz question if an answer has been chosen
nextButton.addEventListener("click", () => {
  if (hasChosen) {
    if (questionsIndex === questions.length - 2) {
      nextButton.style.visibility = "hidden";
    }
    questionsIndex++;
    displayQuestion();
    hasChosen = false;
    options.forEach((option) => {
      option.style.cursor = "pointer";
      option.classList.remove("correct", "wrong");
      option.classList.add("hover");
      questionResult.textContent = "";
      questionResult.classList.remove(
        "question-result-correct",
        "question-result-wrong"
      );
    });
  } else {
    questionResult.textContent = "Please choose an answer";
    questionResult.classList.add("question-result-wrong");
    setTimeout(() => {
      questionResult.textContent = "";
      questionResult.classList.remove("question-result-wrong");
    }, 1000);
  }
});

// If hasChosen is false then let the user make a choice/alert the result
let hasChosen = false;
let score = 0;
options.forEach((option) => {
  option.addEventListener("click", () => {
    if (!hasChosen) {
      if (option.textContent === questions[questionsIndex].correctAnswer) {
        score++;
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
      if (questionsIndex === questions.length - 1) {
        nextButton.classList.add("hidden");
        playAgain.classList.remove("hidden");
        questionNumber.textContent = `You scored: ${score} out of 10`;
        playAgain.addEventListener("click", () => {
          questionsIndex = 0;
          displayQuestion();
          questionResult.textContent = "";
          playAgain.classList.add("hidden");
          nextButton.classList.remove("hidden");
          nextButton.style.visibility = "visible";
          options.forEach((option) => {
            option.classList.add("hover");
            option.classList.remove("correct", "wrong");
            hasChosen = false;
          });
        });
      }
      options.forEach((option) => {
        option.classList.remove("hover");
        option.style.cursor = "default";
      });
      hasChosen = true;
    }
  });
});
