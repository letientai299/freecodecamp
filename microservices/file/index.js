const express = require("express");
const router = express.Router();
const path = require("path");

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that our API is remotely testable by FCC
const cors = require("cors");
// some legacy browsers choke on 204
router.use(cors({ optionsSuccessStatus: 200 }));

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024, // 100KB
    files: 1, // doesn't need to handle more than 1 file per req
    fields: 1,
  },
});

router.get("/", (req, res) => {
  const index = path.join(__dirname, "./index.html");
  return res.sendFile(index);
});

router.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  const file = req.file;
  const json = {
    name: file.originalname,
    type: file.mimetype,
    size: file.size,
  };
  console.log(json);
  return res.json(json);
});

module.exports = router;
