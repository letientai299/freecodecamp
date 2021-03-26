"use strict";

const fs = require("fs");
const express = require("express");
const index = express.Router();
const PATH_PREFIX = "/microservices/course";

if (!process.env.DISABLE_XORIGIN) {
  index.use(function (req, res, next) {
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

index.use("/public", express.static(process.cwd() + PATH_PREFIX + "/public"));

index.route("/_api/package.json").get(function (req, res, next) {
  console.log("requested");
  fs.readFile(__dirname + "/package.json", function (err, data) {
    if (err) return next(err);
    res.type("txt").send(data.toString());
  });
});

index.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + PATH_PREFIX + "/views/index.html");
});

// Respond not found to all the wrong routes
index.use(function (req, res, next) {
  res.status(404);
  res.type("txt").send("Not found");
});

// Error Middleware
index.use(function (err, req, res, next) {
  if (err) {
    res
      .status(err.status || 500)
      .type("txt")
      .send(err.message || "SERVER ERROR");
  }
});

module.exports = index;
