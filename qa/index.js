const router = require("express").Router();

router.use("/chai", require("./chai"));
router.use("/converter", require("./converter"));
router.use("/tracker", require("./tracker"));
router.use("/lib", require("./lib"));
router.use("/sudoku", require("./sudoku"));

module.exports = router;
