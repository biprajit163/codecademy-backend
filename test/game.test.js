
const assert = require('chai').assert;
const { testUser } = require('../game');


describe('Array', () => {
    describe('correct letter', () => {
        it('return true if letter is inside codeword', () => {
            let usrAns = testUser();
            assert.equal(usrAns, true);
            assert.typeOf(usrAns, 'boolean');
        });
    });

    describe('incorrect letter', () => {
        it('return false if letter is not inside codeword', () => {
            let usrAns = testUser();
            assert.equal(usrAns, false);
            assert.typeOf(usrAns, 'boolean');
        });
    });
});


