
const playGame = require('../game').playGame;

test('Does the playGame function return true?', () => {
    expect(playGame()).toBe(true);
});


