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
    
GET ./api/whoami

See the FCC link for usage details.

https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/request-header-parser-microservice
`.trim()
  );
});

router.get("/api/whoami", (req, res) => {
  return res.json({
    ipaddress: req.ip,
    language: req.headers["accept-language"],
    software: req.headers["user-agent"],
  });
});

module.exports = router;
