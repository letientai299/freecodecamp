const path = require("path");
const compression = require("compression");
const express = require("express");
const router = express.Router();

const ignoredPaths = [
  "/ms/timestamp/api/",
  "/ms/who/api/",
  "/ms/short/api/",
  "/ms/tracker/", // need HTML
  "/ms/file", // need HTML
  "/qa/converter/api",
  "/qa/tracker/api",
  "/qa/lib/api",
];

/**
 * Enforce trailing class, so that routers in other directories work with local
 * files as expected.
 */
router.use((req, res, next) => {
  // special handling for some courses
  for (let p of ignoredPaths) {
    if (req.path.startsWith(p)) {
      return next();
    }
  }

  if (req.method !== "GET") {
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

router.get("/", (req, res) => {
  res.end(
    `Hello! Not much here. See this instead: https://letientai.io/freecodecamp/`
  );
});

router.get("/favicon.ico", (req, res) =>
  res.sendFile(path.join(__dirname, "./favicon.ico"))
);

router.use(compression());

module.exports = {
  router,
};
