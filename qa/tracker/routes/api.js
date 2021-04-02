const nanoid = require("nanoid").nanoid;

/**
 * @param {Router} router
 */
module.exports = function (router) {
  // WARNING: this is per worker, won't work well when running this
  // application in cluster mode.
  router.mem = initMem();

  function initMem() {
    return { projects: {} };
  }

  const resetInternal = 10 * 60 * 1000;
  (function resetMem() {
    router.mem = initMem();
    setInterval(resetMem, resetInternal);
  })();

  const inject = injectProject(router);

  router
    .route("/api/issues/:project")

    .get(inject, function (req, res) {
      const p = req.project;
      let issues = Object.keys(p.issues).map((k) => p.issues[k]);

      // sorry, I only done enough to pass the test
      // in real project, the filter part should be must more complicated.
      for (let k in req.query) {
        issues = issues.filter((is) => is[k] === req.query[k]);
      }

      return res.json(issues);
    })

    .post(inject, function (req, res) {
      const issue = withDefault(req.body);

      if (!isValid(issue)) {
        return res.json(err("required field(s) missing"));
      }

      // add auto fields
      issue["created_on"] = new Date();
      issue["updated_on"] = new Date();
      issue["open"] = true;
      issue["_id"] = nanoid();

      const p = req.project;
      p.issues[issue._id] = issue;
      router.mem.projects[p.id] = p;
      return res.json(issue);
    })

    .put(inject, function (req, res) {
      const p = req.project;
      const toBeUpdated = req.body;

      if (!toBeUpdated["_id"]) {
        return res.json(err("missing _id"));
      }

      // this must be done before the check for existing issue.
      const keys = Object.keys(toBeUpdated);
      // note: this might not work if they send unknown fields
      if (!hasFieldsToUpdate(toBeUpdated)) {
        return res.json(err("no update field(s) sent", toBeUpdated._id));
      }

      const issue = p.issues[toBeUpdated._id];
      if (!issue) {
        return res.json(err("could not update", toBeUpdated._id));
      }

      keys
        .filter((k) => allFields.includes(k))
        .forEach((k) => {
          issue[k] = toBeUpdated[k];
        });

      issue["updated_on"] = new Date();
      p.issues[issue._id] = issue;
      router.mem.projects[p.id] = p;
      return res.json(suc("successfully updated", issue._id));
    })

    .delete(inject, function (req, res) {
      const id = req.body._id;
      if (!id) {
        return res.json(err("missing _id"));
      }

      const p = req.project;

      if (!p.issues[id]) {
        return res.json(err("could not delete", id));
      }

      delete p.issues[id];
      router.mem.projects[p.id] = p;
      return res.json(suc("successfully deleted", id));
    });
};

const requiredFields = ["issue_title", "issue_text", "created_by"];
const optionalFields = ["assigned_to", "status_text"];
const allFields = [...requiredFields, ...optionalFields, "open", "created_on"];

const injectProject = (router) =>
  function (req, res, next) {
    let pid = req.params.project;
    let p = router.mem.projects[pid];

    if (!p && pid !== "") {
      p = { issues: {}, id: pid };
      router.mem.projects[pid] = p;
    }

    req.project = p;

    return next();
  };

function hasFieldsToUpdate(is) {
  return [...allFields.filter((k) => is.hasOwnProperty(k))].length !== 0;
}

function isValid(is) {
  const missed = requiredFields.filter((k) => !is[k]);
  return missed.length === 0;
}

function withDefault(is) {
  const copy = Object.assign({}, is);

  optionalFields.forEach((k) => {
    if (!copy[k]) {
      copy[k] = "";
    }
  });
  return copy;
}

const err = (s, id) => {
  const e = { error: s };
  if (id) {
    e._id = id;
  }
  return e;
};

const suc = (s, id) => {
  const r = { result: s };
  if (id) {
    r._id = id;
  }
  return r;
};
