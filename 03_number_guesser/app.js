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
    winningNum = getRandomNum(min, max),
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

// Play again event listener
game.addEventListener('mousedown', function(e) {
  if (e.target.classList.contains('play-again')) {
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener('click', function() {
  let guess = parseInt(guessInput.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // Check if won
  if (guess == winningNum) {
    // Game over - won

    gameOver(true, `${winningNum} is correct, YOU WIN BRO!`);
  } else {
    guessesLeft -= 1;

    if (guessesLeft == 0) {
      // Game over - lost

      gameOver(false, `Game over, you lost. The correct number was ${winningNum}`);
    } else {
      // Game continues - answer wrong

      // Change border color
      guessInput.style.borderColor = 'red';
      // Clear input
      guessInput.value = '';
      // Set message
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
    }
  }
});

// Set message
function setMessage(text, color) {
  message.style.color = color;
  message.textContent = text;
}

// Game over
function gameOver(won, text) {
  let color;
  (won === true) ? color = 'green' : color = 'red';

  // Disable input
  guessInput.disabled = true;
  // Set border color
  guessInput.style.borderColor = color;
  // Set text color
  message.style.color = color;
  // Set message
  setMessage(text, color);

  // Play again?
  guessBtn.value = 'Play again';
  guessBtn.className += 'play-again';
}

// Get random number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}