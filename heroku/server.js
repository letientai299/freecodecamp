const isProd = process.env.NODE_ENV === "production";

const path = require("path");
const { v4: uuid } = require("uuid");
const express = require("express");
const router = express.Router();

const winston = require("winston");
const colorize = winston.format.colorize().colorize;

const rootLogger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.metadata(),
    winston.format.printf((info) => {
      const { level, message, metadata } = info;
      const { timestamp, requestId } = metadata;
      const color = (s) => colorize(`${level}`, s);

      if (!!requestId) {
        return (
          `${timestamp} ` + color(`${requestId} ${level}:`) + ` ${message}`
        );
      }

      return color(`server - ${timestamp} ${level}:`) + ` ${message}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

if (!isProd) {
  // see the guide for setting up live reload both front and back ends here.
  // https://bytearcher.com/articles/refresh-changes-browser-express-livereload-nodemon/
  const connectLivereload = require("connect-livereload");
  const livereload = require("livereload");

  // setup live reload server
  const liveReloadServer = livereload.createServer();
  let msPath = path.join(__dirname, "../microservices");
  liveReloadServer.watch(msPath);
  let qaPath = path.join(__dirname, "../qa");
  liveReloadServer.watch(qaPath);

  // sent reload refresh to client  on local files chance.
  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });

  // inject client script to receive reload notification from live reload server.
  router.use(connectLivereload());
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

/**
 * Generate request ID, log and inject the logger to other routers
 */
router.use((req, res, next) => {
  // generate unique request ID
  const reqId = uuid();
  const log = rootLogger.child({ requestId: reqId });

  // inject logger into request context to use it in later controller
  req.ctx = { log: log };
  log.debug(req.originalUrl);
  next();
});

router.use("/ms", require("../microservices"));
router.use("/qa", require("../qa"));
router.get("/", (req, res) => res.send("Hello!"));
router.get("/favicon.ico", (req, res) =>
  res.sendFile(path.join(__dirname, "./favicon.ico"))
);

const app = express();
app.use(router);
app.listen(port, () => {
  rootLogger.info(`Listening at http://localhost:${port}`);
});
