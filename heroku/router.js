const path = require("path");
const compression = require("compression");
const express = require("express");
const router = express.Router();

/**
 * Enforce trailing class, so that routers in other directories work with local
 * files as expected.
 */
router.use((req, res, next) => {
  if (req.method !== "GET") {
    return next();
  }

  // special handling for some course
  if (
    req.path.startsWith("/ms/timestamp/api/") ||
    req.path.startsWith("/ms/who/api/") ||
    req.path.startsWith("/ms/short/api/") ||
    req.path.startsWith("/ms/file") // we need to show the HTML in this path
  ) {
    return next();
  }

  let url = req.url;
  // special handling for GET requests to static assets
  if (url.match(/\.(css|html|js|jpe?g|png|webp|ico|json)(\?.*)?$/)) {
    return next();
  }

  if (url.match(/\/(_api\/).*/)) {
    return next();
  }

  let queryStart = url.indexOf("?");
  if ((queryStart > 0 && url[queryStart - 1] === "/") || url.endsWith("/")) {
    return next();
  }

  if (queryStart < 0) {
    return res.redirect(301, url + "/");
  }

  url = url.substring(0, queryStart) + "/" + url.substring(queryStart);
  res.redirect(301, url);
});

// send the request ID to front end for troubleshooting if needed.
router.use((req, res, next) => {
  res.setHeader("X-Request-ID", `${req.id}`);
  next();
});

router.use("/ms", require("../microservices"));
router.use("/qa", require("../qa"));

let counter = 0;

router.get("/", (req, res) => {
  counter++;
  res.end(`Hello! ${counter}`);
});

router.get("/favicon.ico", (req, res) =>
  res.sendFile(path.join(__dirname, "./favicon.ico"))
);

router.use(compression());

module.exports = {
  router,
};
