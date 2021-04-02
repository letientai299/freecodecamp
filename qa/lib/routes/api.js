const nanoid = require("nanoid").nanoid;

const errNoBook = "no book exists";
const missingField = (s) => `missing required field ${s}`;

module.exports = function (router) {
  // WARNING: this is per worker, won't work well when running this
  // application in cluster mode.
  router.mem = initMem();

  function initMem() {
    return { books: {} };
  }

  const resetInternal = 10 * 60 * 1000;
  (function resetMem() {
    router.mem = initMem();
    setInterval(resetMem, resetInternal);
  })();

  router
    .route("/api/books")
    .get(function (req, res) {
      const bs = Object.keys(router.mem.books).map((k) => router.mem.books[k]);
      return res.json([...bs]);
    })

    .post(function (req, res) {
      const title = req.body.title;
      if (!title) {
        return res.json(missingField("title"));
      }

      const b = req.body;
      b._id = nanoid();

      // new book, no comment yet.
      b.comments = [];
      b.commentcount = 0;
      router.mem.books[b._id] = b;
      return res.json(b);
    })

    .delete(function (req, res) {
      router.mem = initMem();
      return res.json("complete delete successful");
    });

  router
    .route("/api/books/:id")
    .get(function (req, res) {
      const bid = req.params.id;

      const b = router.mem.books[bid];
      if (!b) {
        return res.json(errNoBook);
      }

      return res.json(b);
    })

    .post(function (req, res) {
      const bid = req.params.id;
      const cmt = req.body.comment;
      if (!cmt) {
        return res.json(missingField("comment"));
      }

      const b = router.mem.books[bid];
      if (!b) {
        return res.json(errNoBook);
      }

      b.comments.push(cmt);
      b.commentcount = b.comments.length;
      router.mem.books[bid] = b;
      return res.json(b);
    })

    .delete(function (req, res) {
      let bid = req.params.id;

      const b = router.mem.books[bid];
      if (!b) {
        return res.json(errNoBook);
      }

      delete router.mem.books[b._id];
      return res.json("delete successful");
    });
};
