const fs = require("fs");
const express = require("express");
const router = express.Router();
const path = require("path");

if (!process.env.DISABLE_XORIGIN) {
  router.use(function (req, res, next) {
    let allowedOrigins = [
      "https://narrow-plane.gomix.me",
      "https://www.freecodecamp.com",
    ];
    let origin = req.headers.origin || "*";
    if (!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1) {
      console.log(origin);
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
    }
    next();
  });
}

router.use(express.static(__dirname + "/public"));

router.route("/_api/package.json").get(function (req, res, next) {
  console.log("requested");
  fs.readFile(__dirname + "/package.json", function (err, data) {
    if (err) return next(err);
    res.type("txt").send(data.toString());
  });
});

router.route("/").get(function (req, res) {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

// Respond not found to all the wrong routes
router.use(function (req, res, next) {
  res.status(404);
  res.type("txt").send("Not found");
});

// Error Middleware
router.use(function (err, req, res, next) {
  if (err) {
    res
      .status(err.status || 500)
      .type("txt")
      .send(err.message || "SERVER ERROR");
  }
});

module.exports = router;
