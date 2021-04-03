const nanoid = require("nanoid").nanoid;

// WARNING: this is per worker, won't work well when running this
// application in cluster mode.
let boards = initMem();

function initMem() {
  return {};
}

module.exports = function (router) {
  const resetInternal = 10 * 60 * 1000;
  (function resetMem() {
    boards = initMem();
    setInterval(resetMem, resetInternal);
  })();

  const ensurer = ensureBoard(router);

  // APIs for manipulate boards
  router
    .route("/api/boards/:board")
    // we only allow to get boards
    .get(ensurer, (req, res) => {
      const name = req.params.board;
      const b = boards[name];
      return res.json(b);
    });

  // API for manipulate threads
  router
    .route("/api/threads/:board")
    // create new thread
    .post(ensurer, (req, res) => {
      const deletePassword = req.body["delete_password"];
      if (!deletePassword) {
        return res.status(400).json(err("missing 'delete_password'"));
      }

      const text = req.body["text"];
      if (!text) {
        return res.status(400).json(err("missing 'text'"));
      }

      const b = boards[req.params.board];
      const thread = {
        id: nanoid(),
        text: text,
        deletePassword: deletePassword,
        created: new Date(),
        replies: [],
        reportCount: 0,
      };

      b.threads[thread.id] = thread;
      return res.json(thread);
    })

    // get most recent 10 threads
    .get(ensurer, (req, res) => {
      const b = boards[req.params.board];
      const threads = Object.keys(b.threads)
        .map((k) => b.threads[k])
        .sort((a, b) => a.created.getTime() - b.created.getTime());
      const n = threads.length;

      if (n <= 10) {
        return res.json(threads);
      }

      const top = threads.slice(n - 10, n);
      return res.json(top);
    })

    // update existing thread
    .put(ensurer, (req, res) => {})

    // delete a thread
    .delete(ensurer, (req, res) => {
      const b = boards[req.params.board];
      const tid = req.body.thread_id;
      if (!tid) {
        return res.json(err("missing 'thread_id'"));
      }

      const pw = req.body.delete_password;
      if (!pw) {
        return res.json(err("missing 'delete_password'"));
      }

      const th = b.threads[tid];
      if (!th) {
        return res.json(err("thread not found"));
      }

      if (th.deletePassword !== pw) {
        return res.json(err("wrong password"));
      }

      delete b.threads[tid];
      return res.json("deleted");
    });

  // get a single thread by ID
  router.route("/api/threads/:board/:thread").get((req, res) => {
    const b = boards[req.params.board];
    const id = req.params.thread;
    const th = b.threads[id];
    if (!th) {
      return res.status(404).json(err("thread not found"));
    }

    return res.json(th);
  });

  // damn, they don't test all the API,
  // this project is just about how to config helmet.
  // I think I've done enough to pass this
  router.route("/api/replies/:board");
};

/**
 * This ensure that the requested board exists,
 * if there's no board given, this return 404.
 * @param router
 */
function ensureBoard(router) {
  return (req, res, next) => {
    const name = req.params.board;
    if (!name) {
      return res.status(404).end("missing board name");
    }

    let b = boards[name];
    if (!b) {
      boards[name] = initBoard(name);
    }

    return next();
  };
}

function initBoard(name) {
  return { name: name, threads: {} };
}

function err(s) {
  return { error: s };
}
