const errors = require("./errors");

class Solver {
  validate(puzzle) {
    if (puzzle.length !== 81) {
      return errors.InvalidLength;
    }

    if (!puzzle.match(/^[0-9.]{81}$/)) {
      return errors.InvalidCharacter;
    }

    return null;
  }

  validateXY(x, y) {
    if (isNaN(x) || isNaN(y)) {
      return errors.InvalidXY;
    }

    if (x < 0 || x >= 9 || y < 0 || y >= 9) {
      return errors.InvalidXY;
    }

    return "";
  }

  checkError(puzzle, y, x, v) {
    let err = this.validate(puzzle);
    if (err) {
      return err === errors.CellNoConflict ? "" : err;
    }
    err = this.validateXY(x, y);
    if (err) {
      return err;
    }

    if (isNaN(v) || v < 1 || v > 9) {
      return errors.InvalidValue;
    }

    const i = y * 9 + x;
    const c = puzzle[i];
    if (c !== ".") {
      if (v !== parseInt(c)) {
        return errors.CellConflict;
      }
      return errors.CellNoConflict;
    }

    return "";
  }

  checkRowPlacement(puzzle, y, x, v) {
    let err = this.checkError(puzzle, y, x, v);
    if (err) {
      return err === errors.CellNoConflict ? "" : err;
    }

    let row = [...puzzle.slice(y * 9, (y + 1) * 9)];
    const nums = row.filter((c) => c !== ".").map((c) => parseInt(c));
    const notOK = nums.includes(v);
    return notOK ? errors.InvalidPlacement : "";
  }

  checkColumnPlacement(puzzle, y, x, v) {
    let err = this.checkError(puzzle, y, x, v);
    if (err) {
      return err;
    }

    const nums = [];
    for (let i = 0; i < 9; i++) {
      const c = puzzle[i * 9 + x];
      if (c !== ".") {
        nums.push(parseInt(c));
      }
    }

    const notOK = nums.includes(v);
    return notOK ? errors.InvalidPlacement : "";
  }

  checkRegionPlacement(puzzle, y, x, v) {
    let err = this.checkError(puzzle, y, x, v);
    if (err) {
      return err === errors.CellNoConflict ? "" : err;
    }

    const nums = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const c = puzzle[(y - (y % 3) + i) * 9 + (x - (x % 3)) + j];
        if (c !== ".") {
          nums.push(parseInt(c));
        }
      }
    }
    const notOK = nums.includes(v);
    return notOK ? errors.InvalidPlacement : "";
  }

  solve(puzzle) {
    // TODO
    return puzzle;
  }
}

module.exports = Solver;
