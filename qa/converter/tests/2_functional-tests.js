const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

let assert = chai.assert;
let port = process.env.PORT;
const serverURL = `http://localhost:${port ? port : 3000}/qa/converter`;

suite("Functional Tests", function () {
  const testCases = {
    // input -> want
    "2mi": "2 miles converts to 3.21868 kilometers",
    km: "1 kilometers converts to 0.62137 miles",
    "2l": "2 litters converts to 0.52834 gallons",
    "2L": "2 litters converts to 0.52834 gallons",
    gal: "1 gallons converts to 3.78541 litters",
  };

  Object.keys(testCases).forEach((k) => {
    test(k, function (done) {
      chai
        .request(serverURL)
        .get("/api/convert?input=" + k)
        .end((err, res) => {
          if (err) {
            assert.fail("shouldn't have error, but got " + err);
            return done();
          }

          assert.isTrue(200 <= res.status && res.status < 300);
          const want = testCases[k];
          const actual = res.body["string"];
          assert.strictEqual(actual, want);
          done();
        });
    });
  });
});
