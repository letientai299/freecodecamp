const router = require("express").Router();

const subs = ["./bulletin-board"];

subs.forEach((p) => {
  router.use(p.slice(1), require(p));
});

module.exports = router;
