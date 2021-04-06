const express = require("express");
const router = express.Router();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that our API is remotely testable by FCC
const cors = require("cors");
// some legacy browsers choke on 204
router.use(cors({ optionsSuccessStatus: 200 }));

router.get("/", (req, res) => {
  return res.end(
    `
This is build for a FCC final project. Exposed API on this path:

GET ./api/timestamp/:date?

See the FCC link for usage details.

https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/timestamp-microservice
`.trim()
  );
});

router.get("/api/timestamp/:date?", (req, res) => {
  let s = req.params.date;
  return res.json(genResponse(s));
});

function genResponse(s) {
  let date = parseDateString(s);
  if (date.toUTCString() === "Invalid Date") {
    return { error: date.toUTCString() };
  }

  return {
    unix: Math.floor(date.getTime()),
    utc: date.toUTCString()
  };
}

function parseDateString(s) {
  console.log(s);
  if (!s) {
    return new Date();
  }

  if (s.match(/^\d+$/)) {
    let ts = parseInt(s);
    return new Date(ts);
  }

  return new Date(s);
}

module.exports = router;
