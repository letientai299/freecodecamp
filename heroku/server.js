const express = require("express");
const app = express();
let port = process.env.PORT;

if (port === undefined || port === "") {
  port = 3000;
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
