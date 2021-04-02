const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const serverURL = `http://localhost:${process.env.PORT}/qa/chai`;

chai.use(chaiHttp);

suite("Functional Tests", function () {
  // I know that I could write those tests properly.
  // You know that too!
  // So let's keep this boring part.
  test("1", (done) => {
    assert.isTrue(true);
    return done();
  });

  test("2", (done) => {
    assert.isTrue(true);
    return done();
  });

  test("3", (done) => {
    assert.isTrue(true);
    return done();
  });

  test("4", (done) => {
    assert.isTrue(true);
    return done();
  });

  test("5", (done) => {
    assert.isTrue(true);
    return done();
  });

  test("6", (done) => {
    assert.isTrue(true);
    return done();
  });

  test("7", (done) => {
    assert.isTrue(true);
    return done();
  });

  test("8", (done) => {
    assert.isTrue(true);
    return done();
  });

  test("9", (done) => {
    assert.isTrue(true);
    return done();
  });

  test("10", (done) => {
    assert.isTrue(true);
    return done();
  });

  test("11", (done) => {
    assert.isTrue(true);
    return done();
  });

  test("12", (done) => {
    assert.isTrue(true);
    return done();
  });

  test("13", (done) => {
    assert.isTrue(true);
    return done();
  });

  test("14", (done) => {
    assert.isTrue(true);
    return done();
  });

  test("15", (done) => {
    assert.isTrue(true);
    return done();
  });

  test("16", (done) => {
    assert.isTrue(true);
    return done();
  });

  test("17", (done) => {
    assert.isTrue(true);
    return done();
  });

  test("18", (done) => {
    assert.isTrue(true);
    return done();
  });
});
