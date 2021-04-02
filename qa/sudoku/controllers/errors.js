module.exports = {
  InvalidCharacter: new Error("Invalid characters in puzzle"),
  InvalidLength: new Error("Expected puzzle to be 81 characters long"),
  Unsolvable: new Error("Puzzle cannot be solved"),
  InvalidXY: new Error("Invalid coordinate"),
  InvalidValue: new Error("Invalid value"),
  InvalidPlacement: new Error("Invalid placement"),
  CellConflict: new Error("Cell has different value"),
  CellNoConflict: new Error("Cell has same value"),
};
