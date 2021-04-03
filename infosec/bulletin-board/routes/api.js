"use strict";

module.exports = function (router) {
  router.route("/api/threads/:board").post();

  router.route("/api/replies/:board");
};
