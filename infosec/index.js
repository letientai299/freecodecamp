const router = require("express").Router();

const subs = ["./bulletin-board", "./stonk", "./game"];

subs.forEach((p) => {
  router.use(p.slice(1), require(p));
});

module.exports = router;
