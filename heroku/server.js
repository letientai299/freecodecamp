const {
  createDevLogger,
  createProdLogger,
  setupLiveReload,
} = require("./util");

const isProd = process.env.NODE_ENV === "production";

const path = require("path");
const compression = require("compression");
const express = require("express");
const router = express.Router();

let logConfig;
if (!isProd) {
  logConfig = createDevLogger();
  setupLiveReload(router);
} else {
  // enable performance monitoring
  require("newrelic");
  logConfig = createProdLogger();
}

let port = process.env.PORT;

if (port === undefined || port === "") {
  port = 3000;
}

/**
 * Enforce trailing class, so that routers in other directories work with local
 * files as expected.
 */
router.use((req, res, next) => {
  let url = req.url;
  let queryStart = url.indexOf("?");
  if ((queryStart > 0 && url[queryStart - 1] === "/") || url.endsWith("/")) {
    next();
    return;
  }

  // special handling for GET requests to static assets
  if (
    queryStart < 0 &&
    req.method === "GET" &&
    url.match(/\.(css|html|js|jpe?g|png|webp|ico)$/)
  ) {
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

router.use(logConfig.middleware);

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
  // req.log.info(`counter: ${counter}`);
});

router.get("/favicon.ico", (req, res) =>
  res.sendFile(path.join(__dirname, "./favicon.ico"))
);

const app = express();

app.use(compression());
app.use(router);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
  logConfig.log.info(`Listening at http://localhost:${port}`);
});
