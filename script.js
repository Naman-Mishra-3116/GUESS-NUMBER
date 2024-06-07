//* getting all the elements of the screen.

const againButtonEl = document.querySelector(".again");
const checkButtonEl = document.querySelector(".check");
const hiddenNumberEl = document.querySelector(".number");
const messageEl = document.querySelector(".message");
const scoreEl = document.querySelector(".score");
const highScoreEl = document.querySelector(".highscore");
const inputEl = document.querySelector(".guess");
var number = getRandomNumber();

// !creating new error for large number
class tooLargeNumber extends Error {
  constructor(message) {
    super(message);
    this.name = "Outside Range 😒😒";
  }
}

// defining onClickFunction

function getRandomNumber() {
  return Math.floor(Math.random() * 20 + 1);
}

function showMessage(message) {
  messageEl.textContent = message;
}

function onClickCheck() {
  const inputValue = Number(inputEl.value);
  const currentScore = Number(scoreEl.textContent);
  const highScore = Number(highScoreEl.textContent);
  try {
    if (currentScore > 0 && inputValue) {
      if (number === inputValue) {
        hiddenNumberEl.textContent = number;
        document.body.style.backgroundColor = "green";
        showMessage("Correct 🤩🤩");
        document.querySelector(".number").style.width = "30rem";
        if (highScore < currentScore) {
          highScoreEl.textContent = currentScore;
        }
      } else if (number > inputValue && inputValue >= 1) {
        showMessage("Too Low!!");
        scoreEl.textContent = currentScore - 1;
      } else if (number < inputValue && inputValue <= 20) {
        showMessage("Too Large!!");
        scoreEl.textContent = currentScore - 1;
      } else if (inputValue > 20 || inputValue < 1) {
        throw new tooLargeNumber("Value out or range");
      }
    } else {
      document.body.style.background = "red";
      showMessage("You lost the game 😑😑");
      highScoreEl.textContent = "0";
    }
  } catch (error) {
    showMessage(error.name);
  }
}

function onClickAgain() {
  number = getRandomNumber();
  scoreEl.textContent = "20";
  document.body.style.background = "#222222";
  hiddenNumberEl.textContent = "?";
  showMessage("Start guessing...");
  inputEl.value = "";
}

// event listeners
checkButtonEl.addEventListener("click", () => onClickCheck());
againButtonEl.addEventListener("click", () => onClickAgain());
