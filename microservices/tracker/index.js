const express = require("express");
const router = express.Router();
const path = require("path");
const nanoid = require("nanoid").nanoid;

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: "false" }));

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that our API is remotely testable by FCC
const cors = require("cors");
// some legacy browsers choke on 204
router.use(cors({ optionsSuccessStatus: 200 }));

router.get("/", (req, res) => {
  const index = path.join(__dirname, "./index.html");
  return res.sendFile(index);
});

// WARNING: this is per worker, won't work well when running this
// application in cluster mode.
router.mem = initMem();

function initMem() {
  return {
    // a map from username -> user
    users: {},
  };
}

const resetInternal = 10 * 60 * 1000;
(function resetMem() {
  router.mem = initMem();
  setInterval(resetMem, resetInternal);
})();

router.post("/api/exercise/new-user", (req, res) => {
  const name = req.body.username;
  if (!name) {
    return res.json(err("need username"));
  }

  let u = router.mem.users[name];
  if (!u) {
    u = createUser(name);
  }
  router.mem.users[name] = u;

  return res.json(u);
});

router.get("/api/exercise/users", (req, res) => {
  const users = Object.values(router.mem.users);
  res.json(users);
});

router.post("/api/exercise/add", (req, res) => {
  const userId = req.body.userId;
  const description = req.body.description;
  const duration = parseInt(req.body.duration);
  const date = req.body.date ? new Date(req.body.date) : new Date();

  const u = Object.values(router.mem.users).filter((u) => u._id === userId)[0];
  if (!u) {
    res.sendStatus(404);
    return res.json(err("user not found"));
  }

  if (!u.log) {
    u.log = [];
  }
  const ex = { description, duration, date };
  u.log.push(ex);
  router.mem.users[u.username] = u;

  res.json({
    _id: u._id,
    username: u.username,
    description: ex.description,
    duration: ex.duration,
    // WTF: need to return toDateString() instead of using date object
    // https://forum.freecodecamp.org/t/apis-and-microservices-projects-exercise-tracker/364236/7
    date: ex.date.toDateString(),
  });
});

router.get("/api/exercise/log", (req, res) => {
  const userId = req.query.userId;

  const u = Object.values(router.mem.users).filter((u) => u._id === userId)[0];
  if (!u) {
    res.sendStatus(404);
    return res.json(err("user not found"));
  }

  let from = req.query.from;
  from = from ? new Date(from) : new Date(0);
  const start = from.getTime();

  let to = req.query.to;
  to = to ? new Date(to) : new Date();
  const end = to.getTime();

  let limit = req.query.limit;

  let log = u.log
    .filter((ex) => {
      const ts = ex.date.getTime();
      return ts >= start && ts <= end;
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  limit = parseInt(limit);
  if (limit !== 0 && !isNaN(limit) && log.length > limit) {
    log = log.slice(0, limit);
  }

  const r = {
    _id: u._id,
    username: u.username,
    count: u.log.length,
    log: log,
  };

  return res.json(r);
});

const err = (s) => ({ error: s });

const createUser = (name) => ({ _id: name, username: name });

module.exports = router;
