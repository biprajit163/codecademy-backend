const assert = require("chai").assert;
const { testUser } = require("../game");

describe("Unit tests for correct letter and incorrect letter" + "\n", () => {
  describe("Guess a letter that is in the codeword", () => {
    it("return true if letter is inside codeword", () => {
      let usrAns = testUser();
      assert.equal(usrAns, true);
      assert.typeOf(usrAns, "boolean");
    });
  });

  describe("Guess a letter that is not in the codeword", () => {
    it("return false if letter is not inside codeword", () => {
      let usrAns = testUser();
      assert.equal(usrAns, false);
      assert.typeOf(usrAns, "boolean");
    });
  });
});
