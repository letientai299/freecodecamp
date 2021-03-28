const chai = require("chai");
const assert = chai.assert;
const serverURL = `http://localhost:${process.env.PORT}/qa/chai`;

const chaiHttp = require("chai-http");
chai.use(chaiHttp);

suite("Functional Tests", function () {
  suite("Integration tests with chai-http", function () {
    // #1
    test("Test GET /hello with no name", function (done) {
      chai
        .request(serverURL)
        .get("/hello/")
        .end(function (err, res) {
          // so funny, they don't accept strictEqual
          assert.equal(res.status, 200);
          assert.equal(res.text, "hello Guest");
          done();
        });
    });
    // #2
    test("Test GET /hello with your name", function (done) {
      chai
        .request(serverURL)
        .get("/hello/?name=xy_z")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "hello xy_z");
          done();
        });
    });
    // #3
    test('send {surname: "Colombo"}', function (done) {
      chai
        .request(serverURL)
        .put("/travellers/")
        .type("application/json")
        .send({ surname: "Colombo" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.equal(res.body.name, "Cristoforo");
          assert.equal(res.body.surname, "Colombo");
          done();
        });
    });
    // #4
    test('send {surname: "da Verrazzano"}', function (done) {
      chai
        .request(serverURL)
        .put("/travellers/")
        .type("application/json")
        .send({ surname: "da Verrazzano" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.equal(res.body.name, "Giovanni");
          assert.equal(res.body.surname, "da Verrazzano");
          done();
        });
    });
  });
});

const Browser = require("zombie");
Browser.site = `http://localhost:${process.env.PORT}`;

suite("Functional Tests with Zombie.js", function () {
  suite('"Famous Italian Explorers" form', function () {
    const browser = new Browser();
    const url = "/qa/chai";
    // #5
    test('submit "surname" : "Colombo" - write your e2e test...', function (done) {
      browser.visit(url, function (err) {
        browser.fill("input[name=surname]", "Colombo", function () {
          browser.pressButton("submit", function () {
            browser.assert.success();
            browser.assert.text("span#name", "Cristoforo");
            browser.assert.text("span#surname", "Colombo");
            browser.assert.element("span#dates", 1);
            done();
          });
        });
      });
    });
    // #6
    test('submit "surname" : "Vespucci" - write your e2e test...', function (done) {
      browser.visit(url, function (err) {
        browser.fill("input[name=surname]", "Vespucci", function () {
          browser.pressButton("submit", function () {
            browser.assert.success();
            browser.assert.text("span#name", "Amerigo");
            browser.assert.text("span#surname", "Vespucci");
            browser.assert.element("span#dates", 1);
            done();
          });
        });
      });
    });
  });
});
