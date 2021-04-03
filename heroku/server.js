require("dotenv").config();

const cluster = require("cluster");
const http = require("http");
const {
  setupLiveReload,
  createDevLogger,
  createProdLogger,
} = require("./util");
const helmet = require("helmet");

// const numCPUs = require("os").cpus().length;
const numCPUs = 1;

const isProd = process.env.NODE_ENV === "production";
let logConfig;
if (!isProd) {
  logConfig = createDevLogger();
} else {
  // enable performance monitoring
  require("newrelic");
  logConfig = createProdLogger();
}

let port = process.env.PORT;
if (port === undefined || port === "") {
  port = 3000;
  process.env.PORT = port;
}

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const express = require("express");
  const app = express();
  app.use(
    helmet({
      contentSecurityPolicy: false,
      referrerPolicy: false,
    })
  );

  app.use(helmet.referrerPolicy({ policy: "same-origin" }));

  // the orders of these middlewares are important.

  app.use(logConfig.middleware);
  if (!isProd && process.env.NODE_ENV !== "debug") {
    setupLiveReload(app);
  }

  const { router } = require("./router");
  app.use(router);
  app.server = http.createServer(app);
  app.disable("x-powered-by");
  app.listen(port);

  console.log(`Worker ${process.pid} started on port ${port}`);
}
