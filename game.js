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
    
    let ufoLevel = 0;
    let incorrectGuesses = [];
    let correctGuesses = [];
    
    let codeDash = [];
    for(let i=0; i < codeword.length-1; i++) {
        codeDash.push("_");
    }

    console.log("UFO: The Game" + "\n" + "Instructions: save us from alien abduction by guessing letters in the codeword");

    while(isPlaying === true) {
        if(ufoLevel === ufoArr.length) {
            isPlaying = endGame(isPlaying);

            codeword = nounsArr[Math.floor(Math.random() * nounsArr.length)];
            codeDash = [];
            for(let i=0; i < codeword.length-1; i++) {
                codeDash.push("_");
            };

            ufoLevel = 0;
        } else {
            console.log(ufoArr[ufoLevel]);
            userInput(codeword, codeDash, correctGuesses, incorrectGuesses);
        }

        ufoLevel++;
    }
};



const userInput = (codeword, codeDash, correctGuesses, incorrectGuesses) => {
    console.log(codeword);
    
    if(incorrectGuesses.length === 0) {
        console.log("Incorrect Guesses:" + "\n" + "None" + '\n');
    } else {
        console.log("Incorrect Guesses:" + "\n" + incorrectGuesses.join(' ').toUpperCase() + '\n');
    }

    let result = codeDash.join(" ");
    console.log(result);

    let userGuess = ps("Please enter your guess: ");

    if(codeword.toLowerCase().includes(userGuess.toLowerCase()) === true) {
        correctGuesses.push(userGuess);
        console.log("Correct! Your're closer to cracking the codeword.");
        let letterLocation = codeword.indexOf(userGuess);
        
        for(let i=0; i < codeDash.length; i++) {
            if(letterLocation === i) {
                codeDash[i] = userGuess;
            }
        }
    } else if(codeword.toLowerCase().includes(userGuess.toLowerCase()) === false) {
        incorrectGuesses.push(userGuess);
        console.log("Incorrect! The tractor beam pulls the person in further");
    } else if(userGuess.split("").length > 1) {
        console.log("That is not a correct guess please guess only one letter from a-z");
    }
};



const endGame = (isPlaying) => {
    let x = true;

    while(x) {
        let playAgain = ps('Would you like to play again (Y/N)? ');

        if(playAgain.toLowerCase() === 'y') {
            isPlaying = true;
            x = false;
        } else if(playAgain.toLowerCase() === 'n') {
            isPlaying = false;
            x = false;
        } 
    } 

    return isPlaying;
}



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

