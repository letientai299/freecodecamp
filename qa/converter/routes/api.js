"use strict";

const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (router) {
  let conv = new ConvertHandler();
  router.get("/api/convert", (req, res) => {
    const input = req.query.input;
    const unit = conv.getUnit(input);
    const from = conv.getNum(input);

    if (unit instanceof Error && from instanceof Error) {
      return res.json("invalid number and unit");
    }

    if (unit instanceof Error) {
      return res.json(unit.message);
    }

    if (from instanceof Error) {
      return res.json(from.message);
    }

    const r = conv.convert(from, unit);
    return res.json(conv.toJson(from, unit, r.num, r.unit));
  });
};
