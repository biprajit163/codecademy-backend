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

    while(isPlaying === true) {

        // Game logic goes here
        console.log('Game is Running');
        testUser();
        endGame(isPlaying);
    }

};



const testUser = (word = codeword) => {
    console.log(word);
    let letter = ps('pick a letter a-z: ');
    let result;
    let guessedLetters = [];

    if(word.includes(letter)) {
        guessedLetters.push(letter);
        result = true;
    } else {
        result = false;
    }

    
    console.log(`you picked ${letter} that is ${result}`);
    return result;
};


const endGame = (isPlaying) => {
    let userAns = ps('Do you want to keep playing? [yes or no] : ');

    if(userAns.toLowerCase() === 'yes') {
        isPlaying = true;
    } else if(userAns.toLowerCase() === 'no') {
        process.exit();
    } else {
        console.log('That is not a valid answer please type "yes" or "no"');
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

