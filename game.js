"use strict";

const fs = require("fs");
const ps = require("prompt-sync")({ sigint: true });

const ufo_data = require("./data/ufo.js");
const ufoArr = ufo_data.ufo_arr;

const message_data = fs.readFileSync("./data/messages.txt", "utf8");
const messageArr = message_data.split("\n");

// Pick a random codeword from the nouns Arr;
const nouns_data = fs.readFileSync("./data/nouns.txt", "utf8");
const nounsArr = nouns_data.split("\n");
let codeword = nounsArr[Math.floor(Math.random() * nounsArr.length)];

const playGame = () => {
  let isPlaying = true;

  let ufoLevel = 0;
  let incorrectGuesses = [];
  let correctGuesses = [];

  let codeDash = [];
  for (let i = 0; i < codeword.length - 1; i++) {
    codeDash.push("_");
  }

  console.log(
    "UFO: The Game" +
      "\n" +
      "Instructions: save us from alien abduction by guessing letters in the codeword" +
      "\n"
  );

  while (isPlaying === true) {
    if (
      ufoLevel === ufoArr.length - 1 ||
      checkWin(codeword, codeDash) === true
    ) {
      if (ufoLevel === ufoArr.length - 1) {
        console.log("You lost the person is abducted!" + "\n");
      } else if (checkWin(codeword, codeDash) === true) {
        console.log(
          "Correct! You saved the person and earned a medal of honor!" +
            "\n" +
            "The codeword is:" +
            codeword +
            "\n"
        );
      }

      isPlaying = endGame(isPlaying);
      codeword = nounsArr[Math.floor(Math.random() * nounsArr.length)];
      codeDash = [];
      correctGuesses = [];
      incorrectGuesses = [];
      for (let i = 0; i < codeword.length - 1; i++) {
        codeDash.push("_");
      }
      ufoLevel = 0;
    } else {
      if (
        ufoLevel === 0 ||
        correctGuesses.length === 0 ||
        incorrectGuesses.length === 0
      ) {
        let displayUfo = ufoArr[ufoLevel];
        console.log(displayUfo + "\n");
      }

      console.log(codeword);

      if (incorrectGuesses.length === 0) {
        console.log("Incorrect Guesses:" + "\n" + "None" + "\n");
      } else {
        console.log(
          "Incorrect Guesses:" +
            "\n" +
            incorrectGuesses.join(" ").toUpperCase() +
            "\n"
        );
      }

      console.log("Codeword:" + "\n" + codeDash.join(" ").toUpperCase() + "\n");

      let checkLetter = true;

      while (checkLetter) {
        let userGuess = ps("Please enter your guess: ");

        if (
          codeword.toLowerCase().includes(userGuess.toLowerCase()) === true &&
          userGuess !== ""
        ) {
          checkLetter = false;
          console.log(ufoArr[ufoLevel] + "\n");
          correctGuesses.push(userGuess.toLowerCase());
          correctGuesses = [...new Set(correctGuesses)];

          if (checkWin(codeword, codeDash) === false) {
            console.log(
              "Correct! Your're closer to cracking the codeword." + "\n"
            );
          }

          for (let i = 0; i < codeDash.length; i++) {
            if (userGuess.toLowerCase() === codeword.split("")[i]) {
              codeDash[i] = userGuess;
            }
          }
        } else if (
          codeword.toLowerCase().includes(userGuess.toLowerCase()) === false &&
          userGuess !== "" &&
          userGuess.split("").length <= 1
        ) {
          checkLetter = false;
          console.log(ufoArr[ufoLevel] + "\n");
          incorrectGuesses.push(userGuess);
          incorrectGuesses = [...new Set(incorrectGuesses)];
          console.log(encourageMessage(messageArr) + "\n");
          ufoLevel++;
        } else if (userGuess.split("").length > 1) {
          console.log(
            "I cannot understand your input please guess a single letter" + "\n"
          );
        }
      }
    }
  }
};

const checkWin = (codeword, codeDash) => {
  let codewordArr = codeword.split("");
  let result = true;

  for (let i = 0; i < codeDash.length; i++) {
    if (codewordArr[i] !== codeDash[i]) {
      result = false;
    }
  }

  return result;
};

const encourageMessage = (encourage) => {
  let randIndex = Math.floor(Math.random() * encourage.length);
  return encourage[randIndex];
};

const endGame = (isPlaying) => {
  let run = true;

  while (run) {
    let playAgain = ps("Would you like to play again (Y/N)? ");

    if (playAgain.toLowerCase() === "y") {
      isPlaying = true;
      run = false;
    } else if (playAgain.toLowerCase() === "n") {
      console.log("Goodbye!" + "\n");
      isPlaying = false;
      run = false;
    }
  }

  return isPlaying;
};

const testUser = (testWord = codeword) => {
  console.log(`codeword: ${testWord}`);
  let letter = ps("enter a letter a-z: ");
  let result;

  if (testWord.includes(letter.toLowerCase())) {
    result = true;
  } else {
    result = false;
  }

  console.log(
    `you picked ${letter} that is ${result ? "correct" : "incorrect"}` + "\n"
  );
  return result;
};

const main = () => {
  if (process.env.NODE_ENV === "development") {
    playGame();
  }
  return false;
};

main();

module.exports = {
  testUser,
};
