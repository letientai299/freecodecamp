const router = require("express").Router();

router.use("/course", require("./course"));

module.exports = router;
