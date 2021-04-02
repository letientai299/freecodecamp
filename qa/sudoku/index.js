require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const fccTestingRoutes = require("./routes/fcctesting.js");
const apiRoutes = require("./routes/api.js");
const router = express.Router();

router.use("/public", express.static(path.join(__dirname, "./public")));
router.use(cors({ origin: "*" })); //For FCC testing purposes only

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//Index page (static HTML)
const index = path.join(__dirname, "./views/index.html");
router.route("/").get((req, res) => {
  res.sendFile(index);
});

//For FCC testing purposes
fccTestingRoutes(router);

// User routes
apiRoutes(router);

//404 Not Found Middleware
router.use(function (req, res, next) {
  res.status(404).type("text").send("Not Found");
});

module.exports = router; // for testing
