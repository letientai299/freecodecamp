const router = require("express").Router();

router.use("/chai", require("./chai"));
router.use("/converter", require("./converter"));

module.exports = router;
