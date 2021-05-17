
const fs = require('fs');

const ufo_data = require('./data/ufo.js');
const ufoArr = ufo_data.ufo_arr;

const message_data = fs.readFileSync('./data/messages.txt', 'utf8');
const messageArr = message_data.split('\n'); 

const nouns_data = fs.readFileSync('./data/nouns.txt', 'utf8');
const nouns_arr = nouns_data.split('\n');


console.log(ufoArr);
console.log(messageArr);
console.log(nouns_arr);






