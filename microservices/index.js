const router = require("express").Router();

router.use("/course", require("./course"));
router.use("/mongo", require("./mongo"));

module.exports = router;
