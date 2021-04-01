const express = require("express");
const router = express.Router();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that our API is remotely testable by FCC
const cors = require("cors");
// some legacy browsers choke on 204
router.use(cors({ optionsSuccessStatus: 200 }));

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: "false" }));

router.get("/", (req, res) => {
  return res.end(
    `
This is build for a FCC final project. Exposed API on this path:
    
- Create a new short URL

  POST ./api/shorturl/new
  
- Access a known URL

  POST ./api/shorturl/<short_url>
  
  You will be redirected to the original URL.


See the FCC link for usage details.

https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/url-shortener-microservice

Note that the short URL will be cleared every 10m, because we store it in memory 
just for the exercise, we don't want to introduce a DB.
`.trim()
  );
});

// WARNING: this implement only works if we don't run the application in
// cluster mode, because the data is local to a single worker only.
router.mem = [];
const resetInternal = 10 * 60 * 1000;

(function resetMem() {
  router.mem = [];
  setInterval(resetMem, resetInternal);
})();

router.post("/api/shorturl/new", (req, res) => {
  const url = req.body.url;
  if (!url.match(/^https:\/\/[^\s.]+(\.[^\s.]+)+\/[^\s]*/)) {
    return res.json({ error: "invalid url" });
  }

  router.mem.push(url);
  return res.json({
    original_url: url,
    short_url: router.mem.length - 1,
  });
});

router.get("/api/shorturl/:id", (req, res) => {
  const id = req.params.id;
  url = router.mem[id];
  if (!url) {
    return res.end();
  }

  return res.redirect(url);
});

module.exports = router;
