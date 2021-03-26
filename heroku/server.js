const isProd = process.env.NODE_ENV === "production";

const express = require("express");
const path = require("path");
const app = express();
const { v4: uuid } = require("uuid");

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
  app.use(connectLivereload());
}

let port = process.env.PORT;

if (port === undefined || port === "") {
  port = 3000;
}

app.use((req, res, next) => {
  // generate unique request ID
  const reqId = uuid();
  const log = rootLogger.child({ requestId: reqId });

  // inject logger into request context to use it in later controller
  req.ctx = { log: log };
  log.debug(req.originalUrl);
  next();
});

app.use("/ms", require("../microservices"));
app.use("/qa", require("../qa"));

app.get("/", (req, res) => {
  res.send("Hello from Github Actions!");
});

app.listen(port, () => {
  rootLogger.info(`Listening at http://localhost:${port}`);
});
