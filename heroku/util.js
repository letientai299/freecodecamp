const pino = require("pino");
const pinoHttp = require("pino-http");
const { BufferedStream } = require("./buffer");
const nanoid = require("nanoid").nanoid;

function genId() {
  return nanoid();
}

function setupLiveReload(router) {
  const path = require("path");
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

function createDevLogger() {
  const { EOL } = require("os");
  const levels = { 50: "error", 40: "warning", 30: "info", 20: "debug" };

  const log = pino({
    level: "debug",
    prettyPrint: {},
    prettifier: (opts) => {
      return (data) => {
        const ts = new Date().toLocaleTimeString().replace(/\..+/, "");
        const level = levels[data.level];

        if (!data.req) {
          return `[server]|${ts}|${level}|${data.msg}${EOL}`;
        }

        const req = data.req;
        const res = data.res;

        return (
          `${ts}|${level}|${req.id}|${req.method} ${req.url}|` +
          `${data.msg}|req_body=${req.body}|res_body=${res.body}${EOL}`
        );
      };
    },
  });

  const middleware = pinoHttp({
    logger: log,
    genReqId: genId,
    useLevel: "debug",
    customSuccessMessage: (res) => {
      return `${res.statusCode} ${res.statusMessage}`;
    },
  });

  return { log: log, middleware: middleware };
}

function createProdLogger() {
  const fs = require("fs");
  if (!fs.existsSync("./log")) {
    fs.mkdirSync("./log");
  }

  const out = require("file-stream-rotator").getStream({
    filename: "./log/data.%DATE%.log",
    date_format: "YYYY-MM-DD",
    frequency: "daily",
    max_logs: 60,
    create_symlink: true,
    size: "100m",
    end_stream: true,
  });

  const bufferedOut = new BufferedStream(out);

  const log = pino({ level: "debug", sync: false }, bufferedOut);
  // const log = pino({ level: "debug" }, out);

  const middleware = pinoHttp({
    logger: log,
    genReqId: genId,
    useLevel: "debug",
  });

  return { log: log, middleware: middleware };
}

module.exports = {
  setupLiveReload,
  createDevLogger,
  createProdLogger,
};
