"use strict";

const SudokuSolver = require("../controllers/solver.js");
const errors = require("../controllers/errors");
const solver = new SudokuSolver();

module.exports = function (app) {
  app.route("/api/check").post((req, res) => {
    const pz = req.body.puzzle;
    const coordinate = req.body.coordinate;
    let v = req.body.value;
    if (!pz || !coordinate || !v) {
      return res.json(err("Required field(s) missing"));
    }

    const xy = convertCoordinate(coordinate);
    if (xy instanceof Error) {
      return res.json(err(xy.message));
    }

    v = parseInt(v);
    let e = solver.checkError(pz, xy.y, xy.x, v);
    if (e && e !== errors.CellConflict && e !== errors.CellNoConflict) {
      return res.json(err(e.message));
    }

    if (e === errors.CellConflict) {
      return res.json({ valid: false });
    }

    if (e === errors.CellNoConflict) {
      return res.json({ valid: true });
    }

    const conflict = [];
    if (solver.checkRowPlacement(pz, xy.y, xy.x, v)) {
      conflict.push("row");
    }

    if (solver.checkColumnPlacement(pz, xy.y, xy.x, v)) {
      conflict.push("column");
    }

    if (solver.checkRegionPlacement(pz, xy.y, xy.x, v)) {
      conflict.push("region");
    }

    return res.json({
      valid: conflict.length === 0,
      conflict,
    });
  });

  app.route("/api/solve").post((req, res) => {
    const pz = req.body.puzzle;
    if (!pz) {
      return res.json(err("Required field missing"));
    }

    const e = solver.validate(pz);
    if (e) {
      return res.json(err(e.message));
    }

    const sol = solver.solve(pz);
    if (sol instanceof Error) {
      return res.json(err(sol.message));
    }

    return res.json({ solution: sol });
  });
};

const err = (s) => ({ error: s });

const convertCoordinate = (co) => {
  if (co.length !== 2) {
    return errors.InvalidXY;
  }

  let [a, b] = co;
  let x = a.charCodeAt(0) - "A".charCodeAt(0);
  let y = parseInt(b) - 1;
  let e = solver.validateXY(x, y);
  if (e) {
    return e;
  }
  return { x, y };
};
