const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/solver.js");
const puzzles = require("../controllers/puzzles");
const solver = new Solver();

suite("UnitTests", () => {
  suite("Validate", () => {
    test("All known puzzles must be valid", () => {
      puzzles
        .flatMap((pz) => pz)
        .forEach((p) => {
          const err = solver.validate(p);
          assert.notTypeOf(err, "Error");
        });
    });

    let unsolved = puzzles[0][0];

    const invalidRowPlacementCases = [
      { x: 0, y: 0, v: 2 },
      { x: 1, y: 0, v: 1 },
      { x: 3, y: 0, v: 1 },
    ];

    invalidRowPlacementCases.forEach((xy) => {
      test(`Invalid row placements: ${JSON.stringify(xy)}`, () => {
        const err = solver.checkRowPlacement(unsolved, xy.y, xy.x, xy.v);
        assert.typeOf(err, "Error");
      });
    });

    const validRowPlacementCases = [
      { x: 1, y: 0, v: 9 },
      { x: 1, y: 1, v: 8 },
    ];

    validRowPlacementCases.forEach((xy) => {
      test(`Valid row placements: ${JSON.stringify(xy)}`, () => {
        const err = solver.checkRowPlacement(unsolved, xy.y, xy.x, xy.v);
        assert.notTypeOf(err, "Error");
      });
    });

    const invalidColumnPlacementCases = [
      { x: 0, y: 0, v: 1 },
      { x: 1, y: 0, v: 2 },
      { x: 3, y: 0, v: 1 },
    ];

    invalidColumnPlacementCases.forEach((xy) => {
      test(`Invalid column placements: ${JSON.stringify(xy)}`, () => {
        const err = solver.checkColumnPlacement(unsolved, xy.y, xy.x, xy.v);
        assert.typeOf(err, "Error");
      });
    });

    const validColumnPlacementCases = [
      { x: 0, y: 1, v: 5 },
      { x: 1, y: 0, v: 1 },
      { x: 3, y: 0, v: 2 },
    ];

    validColumnPlacementCases.forEach((xy) => {
      test(`Valid column placements: ${JSON.stringify(xy)}`, () => {
        const err = solver.checkColumnPlacement(unsolved, xy.y, xy.x, xy.v);
        assert.notTypeOf(err, "Error");
      });
    });

    const invalidRegionPlacementCases = [
      { x: 0, y: 0, v: 2 },
      { x: 1, y: 0, v: 2 },
      { x: 3, y: 0, v: 1 },
    ];

    invalidRegionPlacementCases.forEach((xy) => {
      test(`Invalid region placements: ${JSON.stringify(xy)}`, () => {
        const err = solver.checkRegionPlacement(unsolved, xy.y, xy.x, xy.v);
        assert.typeOf(err, "Error");
      });
    });

    const validRegionPlacementCases = [
      { x: 0, y: 1, v: 3 },
      { x: 3, y: 3, v: 9 },
      { x: 3, y: 4, v: 7 },
    ];

    validRegionPlacementCases.forEach((xy) => {
      test(`Valid region placements: ${JSON.stringify(xy)}`, () => {
        const err = solver.checkRegionPlacement(unsolved, xy.y, xy.x, xy.v);
        assert.notTypeOf(err, "Error");
      });
    });
  });
});
