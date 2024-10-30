let userInput = document.querySelector('.user-input input');
let guessBtn = document.querySelector('.user-input button');
let hintMessage = document.querySelector('.feedback .hint-message');
let noOfGuesses = document.querySelector('.feedback .remaining-chances .chance-count');
let guessedNumbers = document.querySelector('.feedback .guessed-list');
let gameBox = document.querySelector('.game-box');
let gameOverBox = document.querySelector('.game-over-box');
let playAgainBtn = document.querySelector('.game-over-box button');
let resultText = document.querySelector('.game-over-box h3');

let correctGuess;
let guessedNumbersList = [];
let chancesLeft = 3;

// Generate a Random Number between 1 and 10
const generateRandomNumber = () => {
    correctGuess = Math.floor(Math.random() * 10) + 1; // +1 to ensure between 1 and 10
}

// Function to process each guess
const processGuess = () => {
    let userGuess = parseInt(userInput.value);
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
        hintMessage.innerHTML = "Please enter a number between 1 and 10.";
        hintMessage.style.color = "#f44336";
        return;
    }

    if (userGuess !== correctGuess) {
        // Reduce chances if guess is incorrect
        chancesLeft--;
        noOfGuesses.innerHTML = `${chancesLeft}`;

        // Update guessed numbers list
        guessedNumbersList.push(userGuess);
        guessedNumbers.innerHTML = guessedNumbersList.join(", ");

        // Give feedback if the guess is too high or too low
        hintMessage.style.color = "#f44336"; // Set hint message to red for feedback
        hintMessage.innerHTML = userGuess < correctGuess ? "Your guess is too low!" : "Your guess is too high!";

        // If chances are zero, end the game
        if (chancesLeft === 0) {
            gameBox.style.display = 'none';
            gameOverBox.style.display = 'block';
            resultText.innerHTML = "You lost the game! 🙁";
        }

    } else {
        // If guess is correct
        gameBox.style.display = 'none';
        gameOverBox.style.display = 'block';
        resultText.innerHTML = "You won the game! 🥳";
    }

    // Clear input for next guess
    userInput.value = '';
}

// Reset game state when "Play Again" button is clicked
playAgainBtn.addEventListener('click', () => {
    chancesLeft = 3;
    guessedNumbersList = [];
    gameBox.style.display = 'block';
    gameOverBox.style.display = 'none';
    hintMessage.innerHTML = "Start guessing!";
    hintMessage.style.color = "#333";
    noOfGuesses.innerHTML = `${chancesLeft}`;
    guessedNumbers.innerHTML = "None yet";
    generateRandomNumber();
});

// Process guess on button click
guessBtn.addEventListener('click', () => {
    if (userInput.value !== '') {
        processGuess();
    }
});

// Generate a new random number on page load
generateRandomNumber();
