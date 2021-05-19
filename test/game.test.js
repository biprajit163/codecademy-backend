const assert = require('chai').assert;

const game = require('../game');
const playGame = game.playGame;
const testUser = game.testUser;


describe('game.js', () => {
    describe('playGame() testing', () => {
        it('playGame should return true', () => {
            let result = playGame();
            assert.equal(result, true);
        });
    
        it('playGame should return type boolean', () => {
            let result = playGame();
            assert.typeOf(result, 'boolean');
        });
    });

    describe('testUser() checks to see if the letter guessed is part of the word', () => {
        it('testUser should return a letter', async () => {
            let response = await testUser()
        });
    });
});



