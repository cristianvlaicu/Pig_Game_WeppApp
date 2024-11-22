'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0'); // Selects the element for player 0
const player1El = document.querySelector('.player--1'); // Selects the element for player 1
const score0El = document.querySelector('#score--0'); // Selects the element displaying score for player 0
const score1El = document.getElementById('score--1'); // Selects the element displaying score for player 1
const current0El = document.getElementById('current--0'); // Selects the element displaying current score for player 0
const current1El = document.getElementById('current--1'); // Selects the element displaying current score for player 1

const diceEl = document.querySelector('.dice'); // Selects the dice image element
const btnNew = document.querySelector('.btn--new'); // Selects the "New Game" button
const btnRoll = document.querySelector('.btn--roll'); // Selects the "Roll Dice" button
const btnHold = document.querySelector('.btn--hold'); // Selects the "Hold" button

// Starting conditions
let scores, currentScore, activePlayer, playing; // Declares variables to track game state

const init = function () {
  // Function to initialize or reset the game
  scores = [0, 0]; // Resets the scores for both players
  currentScore = 0; // Resets the current score
  activePlayer = 0; // Sets player 0 as the active player
  playing = true; // Sets the game as active

  score0El.textContent = 0; // Resets player 0's displayed score to 0
  score1El.textContent = 0; // Resets player 1's displayed score to 0
  current0El.textContent = 0; // Resets player 0's current score to 0
  current1El.textContent = 0; // Resets player 1's current score to 0

  diceEl.classList.add('hidden'); // Hides the dice image
  player0El.classList.remove('player--winner'); // Removes winner style from player 0
  player1El.classList.remove('player--winner'); // Removes winner style from player 1
  player0El.classList.add('player--active'); // Adds active style to player 0
  player1El.classList.remove('player--active'); // Removes active style from player 1
};

init(); // Calls the initialization function to start the game

const switchPlayer = function () {
  // Function to switch the active player
  document.getElementById(`current--${activePlayer}`).textContent = 0; // Resets the current score for the active player
  currentScore = 0; // Resets the current score variable
  activePlayer = activePlayer === 0 ? 1 : 0; // Switches active player (0 to 1 or 1 to 0)
  player0El.classList.toggle('player--active'); // Toggles the active style for player 0
  player1El.classList.toggle('player--active'); // Toggles the active style for player 1
};

// Roll the dice functionality
btnRoll.addEventListener('click', function () {
  // Adds a click event listener to the "Roll Dice" button
  if (playing) {
    // Checks if the game is active
    // Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1; // Generates a random number between 1 and 6

    // Display dice
    diceEl.classList.remove('hidden'); // Makes the dice image visible
    diceEl.src = `dice-${dice}.png`; // Updates the dice image based on the random roll

    // Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // If the dice roll is not 1
      // Add dice to the current score
      currentScore += dice; // Adds the dice roll to the current score
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // Updates the displayed current score for the active player
    } else {
      // If dice = 1, switch player and reset current score to 0
      switchPlayer(); // Calls the function to switch the active player
    }
  }
});

btnHold.addEventListener('click', function () {
  // Adds a click event listener to the "Hold" button
  if (playing) {
    // Checks if the game is active
    // Add current score to player score
    scores[activePlayer] += currentScore; // Adds the current score to the active player's total score
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer]; // Updates the displayed total score for the active player

    // Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // If the active player's score is 100 or more
      // Finish the game
      playing = false; // Sets the game as inactive
      diceEl.classList.add('hidden'); // Hides the dice image

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner'); // Adds winner style to the active player
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active'); // Removes active style from the active player

      // Switch to the next player
    } else switchPlayer(); // If no winner, switch to the next player
  }
});

btnNew.addEventListener('click', init); // Adds a click event listener to the "New Game" button to restart the game
