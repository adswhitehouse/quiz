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

// Update quiz question function and display quiz on page load starting on question 1
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
  // Only runs if answer has been chosen and hasChosen equals true
  if (hasChosen) {
    if (questionsIndex === questions.length - 2) {
      nextButton.style.visibility = "hidden";
    }
    questionsIndex++;
    setToInitial()
    // If no answer has been given, display a message for 1 second
  } else {
    questionResult.textContent = "Please choose an answer";
    questionResult.classList.add("question-result-wrong");
    setTimeout(() => {
      questionResult.textContent = "";
      questionResult.classList.remove("question-result-wrong");
    }, 1000);
  }
});

// Quiz question/answer functionality
let hasChosen = false;
let score = 0;
options.forEach((option) => {
  option.addEventListener("click", () => {
    // Only runs if hasChosen is false
    if (!hasChosen) {
      // Highlights answer/displays message/updates score if user is correct
      if (option.textContent === questions[questionsIndex].correctAnswer) {
        score++;
        option.classList.add("correct");
        questionResult.textContent = "Correct answer";
        questionResult.classList.add("question-result-correct");
        // Highlights user answer and correct answer/displays message if user is incorrect
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
      // Only executes after answering last question
      if (questionsIndex === questions.length - 1) {
        // Change next button to play again button/display quiz score
        nextButton.classList.add("hidden");
        playAgain.classList.remove("hidden");
        questionNumber.textContent = `You scored: ${score} out of 10`;
        // After clicking play again button, reset game and page back to initial state
        playAgain.addEventListener("click", () => {
          score = 0;
          questionsIndex = 0;
          playAgain.classList.add("hidden");
          nextButton.classList.remove("hidden");
          nextButton.style.visibility = "visible";
          setToInitial()
        });
      }
      // After answer is chosen and regardless of right or wrong answer, remove hover class/change cursor/make hasChosen true so options cant be interacted with until next question
      options.forEach((option) => {
        option.classList.remove("hover");
        option.style.cursor = "default";
      });
      hasChosen = true;
    }
  });
});

// Sets back to a default state on every new question and new round
function setToInitial() {
  displayQuestion();
  questionResult.textContent = "";
  questionResult.classList.remove(
    "question-result-correct",
    "question-result-wrong"
  );
  hasChosen = false;
  options.forEach((option) => {
    option.style.cursor = "pointer";
    option.classList.remove("correct", "wrong");
    option.classList.add("hover");
  });
}
