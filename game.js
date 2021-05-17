
const fs = require('fs');

const ufo_data = require('./data/ufo.js');
const ufo_arr = ufo_data.ufo_arr;

const message_data = fs.readFileSync('./data/messages.txt', 'utf8');


const nouns_data = fs.readFileSync('./data/nouns.txt', 'utf8');
const nouns_arr = nouns_data.split('\n');

console.log(nouns_arr);







