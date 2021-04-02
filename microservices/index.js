const router = require("express").Router();

router.use("/course", require("./course"));
router.use("/mongo", require("./mongo"));
router.use("/timestamp", require("./timestamp"));
router.use("/who", require("./who"));
router.use("/short", require("./short"));
router.use("/file", require("./file"));
router.use("/tracker", require("./tracker"));

module.exports = router;
