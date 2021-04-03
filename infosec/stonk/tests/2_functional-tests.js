const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
let port = process.env.PORT;
const serverURL = `http://localhost:${port ? port : 3000}/infosec/stonk`;

chai.use(chaiHttp);

suite("Functional Tests", () => {
  const api = "/api/stock-prices";
  suite("single valid stock", () => {
    test("SE", (done) => {
      chai
        .request(serverURL)
        .get(`${api}?stock=SE`)
        .end((err, res) => {
          assert.ifError(err);
          assert.strictEqual(res.status, 200);
          const data = res.body.stockData;
          assert.isNumber(data.likes);
          assert.isNumber(data.price);
          assert.strictEqual(data.stock, "SE");
          console.log(data);
          return done();
        });
    });

    test("goog, lowercase", (done) => {
      chai
        .request(serverURL)
        .get(`${api}?stock=goog`)
        .end((err, res) => {
          assert.ifError(err);
          assert.strictEqual(res.status, 200);
          const data = res.body.stockData;
          assert.isNumber(data.likes);
          assert.isNumber(data.price);
          assert.strictEqual(data.stock, "GOOG");
          console.log(data);
          return done();
        });
    });

    test("SE with like", (done) => {
      chai
        .request(serverURL)
        .get(`${api}?stock=SE&like=true`)
        .end((err, res) => {
          assert.ifError(err);
          assert.strictEqual(res.status, 200);
          const data = res.body.stockData;
          assert.isAbove(data.likes, 0);
          assert.isNumber(data.price);
          assert.strictEqual(data.stock, "SE");
          console.log(data);
          return done();
        });
    });
  });

  suite("2 stocks", () => {
    test("SE, FB", (done) => {
      chai
        .request(serverURL)
        .get(`${api}?stock=SE&stock=FB`)
        .end((err, res) => {
          assert.ifError(err);
          assert.strictEqual(res.status, 200);
          const data = res.body.stockData;
          assert.isArray(data);
          console.log(data);
          return done();
        });
    });

    test("SE, FB with like", (done) => {
      chai
        .request(serverURL)
        .get(`${api}?stock=SE&stock=FB&like=true`)
        .end((err, res) => {
          assert.ifError(err);
          assert.strictEqual(res.status, 200);
          const data = res.body.stockData;
          assert.isArray(data);
          data.forEach((d) => {
            assert.isNumber(d["rel_likes"]);
          });
          console.log(data);
          return done();
        });
    });
  });
});
