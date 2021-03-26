const express = require("express");
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

const app = express();

// inject client script to receive reload notification from live reload server.
app.use(connectLivereload());

let port = process.env.PORT;

if (port === undefined || port === "") {
  port = 3000;
}

app.use("/ms", require("../microservices"));
app.use("/qa", require("../qa"));

app.get("/", (req, res) => {
  res.send("Hello from Github Actions!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
