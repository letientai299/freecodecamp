const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const port = process.env.PORT;
const serverURL = `http://localhost:${port ? port : 3000}/qa/sudoku`;
const puzzles = require("../controllers/puzzles");

const errors = require("../controllers/errors");

chai.use(chaiHttp);

suite("Functional Tests", () => {
  suite("check", () => {
    const api = "/api/check";
    const unsolved = puzzles[0][0];

    test("POST /check with invalid value", (done) => {
      chai
        .request(serverURL)
        .post(api)
        .type("form")
        .send({
          puzzle: unsolved,
          coordinate: "A2",
          value: "x",
        })
        .end((err, res) => {
          assert.ifError(err);
          const r = res.body;
          assert.strictEqual(r.error, errors.InvalidValue.message);
          return done();
        });
    });
  });
});
