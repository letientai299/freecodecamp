const router = require("express").Router();

router.use("/chai", require("./chai"));
router.use("/converter", require("./converter"));
router.use("/tracker", require("./tracker"));

module.exports = router;
