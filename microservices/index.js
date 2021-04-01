const router = require("express").Router();

router.use("/course", require("./course"));
router.use("/mongo", require("./mongo"));
router.use("/timestamp", require("./timestamp"));

module.exports = router;
