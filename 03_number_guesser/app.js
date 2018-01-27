/*
GAME FUNCTION:
- Player must guess number between a min and max
- Player gets a cirtain amount of guesses
- Notify player of guesses remaining
- Notify player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1,
    max = 10,
    winningNum = 2,
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessInput = document.querySelector('#guess-input'),
      guessBtn = document.querySelector('#guess-btn'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

guessBtn.addEventListener('click', function() {
  let guess = parseInt(guessInput.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // Check if won
  if (guess == winningNum) {
    // Disable input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = 'green';
    // Set message
    setMessage(`${winningNum} is correct, YOU WIN BRO!`, 'green');
  }
});

// Set message
function setMessage(text, color) {
  message.style.color = color;
  message.textContent = text;
}