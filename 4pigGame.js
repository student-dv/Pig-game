"use strict";

//selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0 = document.getElementById("current--0");
const current1 = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// //starting conditions
// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl.classList.add("hidden");

// const scores = [0, 0]; // score of player0 will be at position 0 & for player1 at position1
// let currScore = 0;
// let activePlayer = 0;
// let playing = true;

let playing, scores, activePlayer, currScore;

//starting conditions
const init = function () {
  const scores = [0, 0]; // score of player0 will be at position 0 & for player1 at position1
  currScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

///////////////////////Rolling dice functionality

btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.floor(Math.random() * 6) + 1;

    //2. display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice != 1) {
      currScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

///////////////////////HOLD/////////////////
btnHold.addEventListener("click", function () {
  if (playing) {
    //. Add current score to active player's score
    scores[activePlayer] += currScore;

    // score[1] = score[1] + currScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //check if player's score is >=100
    if (scores[activePlayer] >= 100) {
      //
      //finish the game
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", function () {
  init;
});
