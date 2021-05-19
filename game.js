"use strict"


const fs = require('fs');
const ps = require('prompt-sync')({ sigint: true });


const ufo_data = require('./data/ufo.js');
const ufoArr = ufo_data.ufo_arr;

const message_data = fs.readFileSync('./data/messages.txt', 'utf8');
const messageArr = message_data.split('\n'); 

const nouns_data = fs.readFileSync('./data/nouns.txt', 'utf8');
const nounsArr = nouns_data.split('\n');



const playGame = () => {
    
    let isPlaying = true;

    while(isPlaying === true) {

        // Game logic goes here
        console.log('Game is Running');

        endGame(isPlaying);
    }


};


const testUser = () => {
    let letter = ps('pick a letter a-z: ');
    let codeword = 'apple'
    let result;

    for(let i=0; i < codeword.length; i++) {
        if(letter === codeword[i]) {
            result = true;
        } else {
            result = false;
        }
    }

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

playGame();


module.exports = {
    testUser, 
}

