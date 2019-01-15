

// VARIABLES       


let currentWord = document.querySelector(".letter"); // for use in "checkLetter" function
let missed = 0;
let lostHeart = 5;
const keyboard = document.querySelector("#qwerty");
var phrase = document.getElementById("phrase");
const startGame = document.querySelector(".btn__reset");
const ul = document.getElementsByTagName("ul")[0];
const listItems = ul.children;
const keyboardButton = keyboard.querySelectorAll('button');
const scoreBoard = document.querySelector("#scoreboardList");
var scoreboardList = scoreBoard.children;
var overlay = document.querySelector("#overlay");
const div = document.createElement('div');
const h1 = document.createElement('h1');
const mainContainer = document.querySelector('.main-container');
const playAgainButton = document.createElement('button');


// ARRAYS          


const phrases = ["lets go see a movie",
                 "lets go to the game",
                 "we dont play fair",
                 "you only live once",
                 "how are you doing",];

// FUNCTIONS       


// random phrase generator
function getRandomPhraseArray(arr) {
	let randomPhrase = arr[Math.floor(Math.random() * arr.length)]; // get random phrase
	let seperateChar = []; // store characters as seperate
	for (let i = 0; i < randomPhrase.length; i++) {
		seperateChar.push(randomPhrase.charAt(i));
	}
	return seperateChar;
}
// get letters from random phrase
function addPhraseToDisplay(arrLetters) {
	for (let i = 0; i < arrLetters.length; i++) {
		let li = document.createElement("li");
		li.textContent = arrLetters[i];
		ul.appendChild(li);
		if (li.textContent === " ") {
			li.classList.add("space");
		} else {
			li.classList.add("letter");
		}
	}
}
// add phrase to display
const phraseArray = getRandomPhraseArray(phrases);
addPhraseToDisplay(phraseArray);
// check letter
function checkLetter(yourGuess) { 
  let li = document.querySelectorAll(".letter");
  let letterFound;
	for (let i = 0; i < li.length; i++) {
    const letter = li[i]; // store "li" items
    if (yourGuess.textContent == letter.textContent) {
      letter.classList.add("show");
      letterFound = letter;
    }
  }
    if (letterFound) {
      console.log("Well done, you guessed right!");
      return letterFound;
  } else {
      return null;
  }
}
// function to check it player has won or lost the game
function checkWin() {
  const liLetter = document.querySelectorAll(".letter");
  const liShow = document.querySelectorAll(".show");
  if (liLetter.length === liShow.length) {
    playAgain();
    h1.textContent = "You won the game!";
    div.id = "win";
    div.classList.add("win");
    
  }
  if (missed == 5) {
    playAgain();
    h1.textContent = "Sorry, you didn't win, would you like to:";
    div.id = "lose";
    div.classList.add("lose");
    console.log("Sorry, you didn't win this time! Better luck next time!");
  }
}
// function creates playAgain button and adds it to the win/lose screen
function playAgain() {
  playAgainButton.textContent = 'Play Again?';
  playAgainButton.classList.add('play__again');
  mainContainer.appendChild(div);
  div.appendChild(h1);
  div.appendChild(playAgainButton);
}
// reset function
function reset(resetSelection) {
  resetSelection.innerHTML = '';
}

// EVENT LISTENERS


// start game button
startGame.addEventListener("click", () => {
  overlay.style.display = "none";
});
// keyboard event listener
keyboard.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const button = e.target;
    button.classList.add("chosen");
    button.disabled = "true";
    const checked = checkLetter(button);
      if (checked === null) {
        missed += 1;
        console.log("Unlucky! " + missed + " wrong answer(s).");
        document.querySelector(".tries").className = "lost__heart";
      }
      checkWin();
  }
});
playAgainButton.addEventListener('click', (e)=> {
  if (e.target.className == 'play__again') {
    div.classList.remove('win', 'lose'); // resets classes to win/lose screen
    mainContainer.removeChild(div); // removes 'win' or 'lose' screen
    reset(ul) // removes random generated name (li) elements
    const phraseArrayNew =  getRandomPhraseArray(phrases); // adds new phrase
    addPhraseToDisplay(phraseArrayNew);
    for (i = 0; i < keyboardButton.length; i++) { // resets keyboard
      let keyboards = keyboardButton[i];
      if (keyboards.disabled === true) {
        keyboards.disabled = false;
        keyboards.classList.remove('chosen');
      }
    }
    missed = 0; // resets missed
    lostHeart = 5; // resets lostHeart
    if (scoreboardList) {
      reset(scoreBoard);
    }
    for (i = 0; i < 5; i++) { // 5 tries
      const li = document.createElement('li');
      li.classList.add('tries');
      scoreBoard.appendChild(li);
    }
  }
})