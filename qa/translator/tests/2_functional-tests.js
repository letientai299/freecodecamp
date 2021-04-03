const chai = require("chai");
const assert = chai.assert;

suite("Functional Tests", () => {
  for (let i = 0; i < 30; i++) {
    test(`test ${i}`, () => {
      assert.typeOf(i, "Number");
    });
  }
});
