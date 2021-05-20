
const assert = require('chai').assert;
const { testUser } = require('../game');


describe('Array', function() {
    describe('correct letter', function() {
        it('return true if letter is inside codeword', function() {
            let usrAns = testUser();
            assert.equal(usrAns, true);
        });
    });
});


