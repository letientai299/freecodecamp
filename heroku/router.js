const path = require("path");
const compression = require("compression");
const express = require("express");
const router = express.Router();

/**
 * Enforce trailing class, so that routers in other directories work with local
 * files as expected.
 */
router.use((req, res, next) => {
  let url = req.url;
  // special handling for GET requests to static assets
  if (
    req.method === "GET" &&
    url.match(/\.(css|html|js|jpe?g|png|webp|ico|json)(\?.*)?$/)
  ) {
    next();
    return;
  }

  if (url.match(/\/(_api\/).*/)) {
    next();
    return;
  }

  let queryStart = url.indexOf("?");
  if ((queryStart > 0 && url[queryStart - 1] === "/") || url.endsWith("/")) {
    next();
    return;
  }

  if (queryStart < 0) {
    res.redirect(301, url + "/");
    return;
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
