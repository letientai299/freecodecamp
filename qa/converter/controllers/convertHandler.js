const errNoUnit = new Error("invalid unit");
const errInvalidNumber = new Error("invalid number");

const units = ["kg", "lbs", "mi", "km", "L", "gal"];

class ConvertHandler {
  constructor() {
    this.getNum = function (input) {
      input = input.toLowerCase();
      const i = this.findUnitStartIndex(input);
      let s = input.slice(0, i);
      // truncate to the number part only
      let n = this.parseNum(s);
      if (n === 0 || isNaN(n)) {
        return errInvalidNumber;
      }

      return n;
    };

    this.parseNum = function (s) {
      // if it's empty, mean we got a request without number, then assuming
      // it's 1
      if (s === "") {
        return 1;
      }

      // single number
      const singleNumRegex = /^[0-9]*\.?[0-9]*$/;
      if (s.match(singleNumRegex)) {
        return parseFloat(s);
      }

      // fractional
      let ss = s.split("/");

      if (ss.length !== 2) {
        // there can't be any other cases
        return errInvalidNumber;
      }

      let [num, deno] = ss;
      if (!num.match(singleNumRegex) || !deno.match(singleNumRegex)) {
        return errInvalidNumber;
      }

      return parseFloat(num) / parseFloat(deno);
    };

    this.getUnit = function (input) {
      input = input.toLowerCase();
      const i = this.findUnitStartIndex(input);
      input = input.slice(i);
      let founds = units.map((u) => u.toLowerCase()).filter((u) => input === u);
      if (founds.length === 0) {
        return errNoUnit;
      }

      let u = founds[0];
      if (u === "l") {
        return u.toUpperCase();
      }

      return u;
    };

    this.getReturnUnit = function (initUnit) {
      const r = this.convert(1, initUnit);
      return r.unit;
    };

    this.convert = function (initNum, initUnit) {
      const galToL = 3.78541;
      const lbsToKg = 0.453592;
      const miToKm = 1.60934;

      if (initUnit === "gal") {
        return { num: initNum * galToL, unit: "L" };
      }

      if (initUnit === "L") {
        return { num: initNum / galToL, unit: "gal" };
      }

      if (initUnit === "mi") {
        return { num: initNum * miToKm, unit: "km" };
      }

      if (initUnit === "km") {
        return { num: initNum / miToKm, unit: "mi" };
      }

      if (initUnit === "lbs") {
        return { num: initNum * lbsToKg, unit: "kg" };
      }

      if (initUnit === "kg") {
        return { num: initNum / lbsToKg, unit: "lbs" };
      }

      return errNoUnit;
    };

    this.fullName = {
      km: "kilometers",
      mi: "miles",
      gal: "gallons",
      L: "litters",
      kg: "kilograms",
      lbs: "pounds",
    };

    this.fmtNum = (n) => {
      if (n.toString().includes(".")) {
        return parseFloat(n.toFixed(5));
      }

      return n;
    };

    this.toJson = function (initNum, initUnit, returnNum, returnUnit) {
      initNum = this.fmtNum(initNum);
      returnNum = this.fmtNum(returnNum);
      return {
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string:
          `${initNum} ${this.fullName[initUnit]} converts to ` +
          `${returnNum} ${this.fullName[returnUnit]}`,
      };
    };

    this.findUnitStartIndex = (input) => {
      let i = input.length - 1;
      while (i >= 0 && input[i].match(/[a-z]/)) {
        i--;
      }
      i++;
      return i;
    };
  }
}

module.exports = ConvertHandler;
