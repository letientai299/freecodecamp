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
    let pz = [...puzzle].map((c) => (c === "." ? 0 : parseInt(c)));

    pz = this.solveRecursive(pz, 0, 0);
    if (!pz) {
      return errors.Unsolvable;
    }

    return pz.join("");
  }

  solveRecursive(pz, x, y) {
    if (x >= 9) {
      return this.solveRecursive(pz, 0, y + 1);
    }

    if (y >= 9) {
      if (pz.filter((c) => c === 0).length === 0) {
        return pz;
      }

      return null;
    }

    const cell = pz[y * 9 + x];
    if (cell !== 0) {
      return this.solveRecursive(pz, x + 1, y);
    }

    // found empty cell, look for possible values
    for (let v = 1; v <= 9; v++) {
      if (!this.cellOK(pz, x, y, v)) {
        continue;
      }

      pz[y * 9 + x] = v;
      const sol = this.solveRecursive(pz, x + 1, y);
      if (sol) {
        return sol; // found a solution
      }
      pz[y * 9 + x] = 0;
    }

    return null; // can't solve
  }

  cellOK(pz, x, y, v) {
    return (
      this.rowOK(pz, x, y, v) &&
      this.colOK(pz, x, y, v) &&
      this.regionOK(pz, x, y, v)
    );
  }

  rowOK(pz, x, y, v) {
    return pz.slice(9 * y, 9 * (y + 1)).filter((c) => c === v).length === 0;
  }

  colOK(pz, x, y, v) {
    return pz.filter((c, i) => i % 9 === x && c === v).length === 0;
  }

  regionOK(pz, x, y, v) {
    const regID = Math.floor(y / 3) * 3 + Math.floor(x / 3);

    const nums = pz.filter((c, i) => {
      const r = Math.floor(Math.floor(i / 9) / 3) * 3 + Math.floor((i % 9) / 3);
      return r === regID && c === v;
    });

    return nums.length === 0;
  }
}

module.exports = Solver;

// for debuging
function print(pz) {
  for (let y = 0; y < 9; y++) {
    let s = "";
    for (let x = 0; x < 9; x++) {
      const i = y * 9 + x;
      const n = pz[i];
      s += ` ${n} `;
    }
    console.log(s);
  }
  console.log("------------------------------");
}
