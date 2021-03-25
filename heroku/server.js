const microservices = require("../microservices/course/server");
const express = require("express");
const app = express();
let port = process.env.PORT;

if (port === undefined || port === "") {
  port = 3000;
}

app.get("/", (req, res) => {
  res.send("Hello from Github Actions!");
});

app.use("/ms", microservices);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
