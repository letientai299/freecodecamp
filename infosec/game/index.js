require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fccTestingRoutes = require("./routes/fcctesting.js");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const nocache = require("nocache");

const router = express.Router();

router.use(cors());
router.use(nocache());
router.use(helmet.hsts());
router.use(helmet.noSniff());
router.use((req, res, next) => {
  res.setHeader("x-powered-by", "PHP 7.4.3");
  res.setHeader("x-xss-protection", "1; mode=block");
  return next();
});

router.use("/public", express.static(path.join(__dirname, "./public")));

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Index page (static HTML)
router.route("/").get(function (req, res) {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

// For FCC testing purposes
fccTestingRoutes(router);

// 404 Not Found Middleware
router.use(function (req, res, next) {
  res.status(404).type("text").send("Not Found");
});

module.exports = router; // For testing
