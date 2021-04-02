const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

const conv = new ConvertHandler();

suite("Unit Tests", function () {
  const testCases = [
    {
      name: "whole number",
      input: "1kg",
      fromValue: 1,
      toValue: 2.20462,
      fromUnit: "kg",
      toUnit: "lbs",
      wantErr: false,
    },

    {
      name: "decimal number",
      input: "2.20462lbs",
      fromValue: 2.20462,
      toValue: 1,
      fromUnit: "lbs",
      toUnit: "kg",
    },

    {
      name: "fractional input",
      input: "1/2kg",
      fromValue: 0.5,
      toValue: 1.10231,
      fromUnit: "kg",
      toUnit: "lbs",
    },

    {
      name: "fractional with a decimal input",
      input: "1.0/2kg",
      fromValue: 0.5,
      toValue: 1.10231,
      fromUnit: "kg",
      toUnit: "lbs",
    },

    {
      name: "default to 1 if no number",
      input: "kg",
      fromValue: 1,
      toValue: 2.20462,
      fromUnit: "kg",
      toUnit: "lbs",
    },

    {
      name: "gal to L",
      input: "gal",
      fromValue: 1,
      toValue: 3.78541,
      fromUnit: "gal",
      toUnit: "L",
    },

    {
      name: "L to gal",
      input: "L",
      fromValue: 1,
      toValue: 0.26417217685798894,
      fromUnit: "L",
      toUnit: "gal",
    },

    {
      name: "mi to km",
      input: "mi",
      fromValue: 1,
      toValue: 1.60934,
      fromUnit: "mi",
      toUnit: "km",
    },
  ];

  suite("getNum", function () {
    testCases.forEach((tc) => {
      test(tc.name, function () {
        const actual = conv.getNum(tc.input);
        if (tc.wantErr) {
          assert.typeOf(actual, "Error");
          return;
        }

        assert.strictEqual(actual, tc.fromValue);
      });
    });
  });

  suite("getUnit", function () {
    testCases.forEach((tc) => {
      test(tc.name, function () {
        const actual = conv.getUnit(tc.input);
        if (tc.wantErr) {
          assert.typeOf(actual, "Error");
          return;
        }

        assert.strictEqual(actual, tc.fromUnit);
      });
    });
  });

  suite("getReturnUnit", function () {
    testCases
      .filter((tc) => tc.fromUnit)
      .forEach((tc) => {
        test(tc.name, function () {
          const actual = conv.getReturnUnit(tc.fromUnit);
          if (tc.wantErr) {
            assert.typeOf(actual, "Error");
            return;
          }
          assert.strictEqual(actual, tc.toUnit);
        });
      });
  });
});
