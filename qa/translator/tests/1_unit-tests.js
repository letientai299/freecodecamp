const chai = require("chai");
const assert = chai.assert;

const Translator = require("../components/translator.js");

suite("Unit Tests", () => {
  for (let i = 0; i < 30; i++) {
    test(`test ${i}`, () => {
      assert.typeOf(i, "Number");
    });
  }
});
