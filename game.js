"use strict"


const fs = require('fs');
const ps = require('prompt-sync')({ sigint: true });


const ufo_data = require('./data/ufo.js');
const ufoArr = ufo_data.ufo_arr;

const message_data = fs.readFileSync('./data/messages.txt', 'utf8');
const messageArr = message_data.split('\n'); 

// Pick a random codeword from the nouns Arr;
const nouns_data = fs.readFileSync('./data/nouns.txt', 'utf8');
const nounsArr = nouns_data.split('\n');
let codeword = nounsArr[Math.floor(Math.random() * nounsArr.length)];


const playGame = () => {
    
    let isPlaying = true;

    let codeDash = "";
    let ufoLevel = 0;
    let incorrectGuesses = [];

    for(let i=0; i < codeword.length - 1; i++) {
        codeDash += "_ ";
    }

    console.log("UFO: The Game" + "\n" + "Instructions: save us from alien abduction by guessing letters in the codeword");

    while(isPlaying === true) {
        if(ufoLevel === ufoArr.length) {
            endGame();
            ufoLevel = 0;
        } else {
            console.log(ufoArr[ufoLevel]);

            if(incorrectGuesses.length === 0) {
                console.log("Incorrect Guesses:" + "\n" + "None" + '\n');
            } else {
                console.log("Incorrect Guesses:" + "\n" + incorrectGuesses.join(' ').toUpperCase() + '\n');
            }

            // logging code word with dashes
            console.log(codeword);
            console.log(codeDash + '\n');
            userInput(codeword, codeDash);

            ufoLevel++;
        }
    }
};


const setCharAt = (string, index, char) => {
    if(index > string.length - 1) {
        return string;
    } else {
        let newStr = string.substring(0, index) + char + string.substring(index + 1);
        return newStr; 
    }
};


const userInput = (codeword, codeDash) => {
    let userGuess = ps("Please enter your guess: ");

    if(codeword.toLowerCase().includes(userGuess.toLowerCase())) {
        console.log("Correct! Your're closer to cracking the codeword.");
        setCharAt(codeDash, codeword.indexOf(userGuess), userGuess);
    } else {
        console.log("Incorrect! The tractor beam pulls the person in further");
    }

    console.log(codeDash);
    return codeDash;
};


const testUser = (testWord = codeword) => {
    console.log(testWord);
    let letter = ps('enter a letter a-z: ');
    let result;

    if(testWord.includes(letter)) {
        result = true;
    } else {
        result = false;
    }
    
    console.log(`you picked ${letter} that is ${result? 'correct' : 'incorrect'}`);
    return result;
};


const endGame = (isPlaying) => {
    let playAgain = ps('Would you like to play again (Y/N)? ');

    if(playAgain.toLowerCase() === 'y') {
        isPlaying = true;
    } else if(playAgain.toLowerCase() === 'n') {
        process.exit();
    } else {
        console.log('That is not a valid answer please type "Y" for yes or "N" for no');
    }

    return isPlaying;
}


const main = () => {
    if(process.env.NODE_ENV === 'development') {
        playGame();
    }
    return false;
}

main();

module.exports = {
    testUser, 
}

