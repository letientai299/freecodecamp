const router = require("express").Router();

router.use("/chai", require("./chai"));
router.use("/converter", require("./converter"));
router.use("/tracker", require("./tracker"));
router.use("/lib", require("./lib"));

module.exports = router;
