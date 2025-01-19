"use strict";
const guessInput = document.getElementById('guess-input');
const submitButton = document.getElementById('submit-btn');  
const restartButton = document.getElementById('restart-btn'); 
const guessMessage = document.getElementById('guess-message');
const currentGuess = document.getElementById('current-guess');
const computerGuess = document.getElementById('computer-guess');
const guessHistory = document.getElementById('guess-history');
const triesCounter = document.getElementById('tries-counter');

// Game variables
let secretNumber;
let guesses = [];
let remainingTries = 3;

// Initialize game
function initGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    console.log("Secret number is: ", secretNumber);
    guesses = [];
    remainingTries = 3;
    
    // Reset display elements
    guessMessage.textContent = "Make your guess!";
    currentGuess.textContent = "-";
    computerGuess.textContent = "?";
    guessHistory.textContent = "-";
    triesCounter.textContent = `Remaining tries: ${remainingTries}`;
    
    submitButton.disabled = false;
    restartButton.disabled = true;
    guessInput.value = '';
}

function handleGuess() {
    const guess = parseInt(guessInput.value);
    console.log("User guessed: ", guess);
    
    if (isNaN(guess) || guess < 1 || guess > 100) {
        alert("Please enter a valid number between 1 and 100");
        return;
    }

    guesses.push(guess);
    currentGuess.textContent = guess;
    guessHistory.textContent = guesses.join(', ');
    remainingTries--;
    triesCounter.textContent = `Remaining tries: ${remainingTries}`;

    if (guess === secretNumber) {
        guessMessage.textContent = "Congratulations! You won!";
        endGame(true);
    } else {
        if (remainingTries === 0) {
            guessMessage.textContent = "Game Over! You're out of tries.";
            computerGuess.textContent = secretNumber;
            endGame(false);
        } else {
            guessMessage.textContent = guess > secretNumber ? 
                "Too high! Try again." : "Too low! Try again.";
        }
    }
    
    guessInput.value = '';
}

function endGame(won) {
    submitButton.disabled = true;
    restartButton.disabled = false;
    computerGuess.textContent = secretNumber;
}

// Event Listeners
submitButton.addEventListener('click', handleGuess);
restartButton.addEventListener('click', initGame);
guessInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        handleGuess();
    }
});

// Start the game when page loads
initGame();