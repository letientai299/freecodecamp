/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *
 */

const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
let port = process.env.PORT;
const serverURL = `http://localhost:${port ? port : 3000}/qa/lib`;
const nanoid = require("nanoid").nanoid;
const api = "/api/books";

chai.use(chaiHttp);

suite("Functional Tests", function () {
  /*
   * ----[EXAMPLE TEST]----
   * Each test should completely test the response of the API end-point including response status code!
   */
  test("#example Test GET /api/books", function (done) {
    chai
      .request(serverURL)
      .get("/api/books")
      .end(function (err, res) {
        if (err) {
          assert.fail("don't want err, but got " + err);
          return done();
        }

        assert.equal(res.status, 200);
        assert.isArray(res.body, "response should be an array");
        const books = res.body;
        if (!!books && books.length === 0) {
          return done();
        }

        assert.property(
          res.body[0],
          "commentcount",
          "Books in array should contain commentcount"
        );
        assert.property(
          res.body[0],
          "title",
          "Books in array should contain title"
        );
        assert.property(
          res.body[0],
          "_id",
          "Books in array should contain _id"
        );
        done();
      });
  });
  /*
   * ----[END of EXAMPLE TEST]----
   */

  suite("Routing tests", function () {
    suite(
      "POST /api/books with title => create book object/expect book object",
      function () {
        test("Test POST /api/books with title", function (done) {
          const title = nanoid();
          chai
            .request(serverURL)
            .post(api)
            .type("form")
            .send({ title })
            .end((err, res) => {
              assert.ifError(err);
              assert.strictEqual(res.status, 200);
              const b = res.body;
              assert.strictEqual(b.title, title);
              assert.typeOf(b._id, "String");
              assert.typeOf(b.commentcount, "Number");
              return done();
            });
        });

        test("Test POST /api/books with no title given", function (done) {
          chai
            .request(serverURL)
            .post(api)
            .type("form")
            .send({ any: nanoid() })
            .end((err, res) => {
              assert.ifError(err);
              const b = res.body;
              assert.strictEqual(b, "missing required field title");
              return done();
            });
        });
      }
    );

    suite("GET /api/books => array of books", function () {
      test("Test GET /api/books", function (done) {
        chai
          .request(serverURL)
          .get(api)
          .end((err, res) => {
            assert.ifError(err);
            assert.strictEqual(res.status, 200);
            const b = res.body;
            assert.isArray(b);
            return done();
          });
      });
    });

    suite("GET /api/books/[id] => book object with [id]", function () {
      test("Test GET /api/books/[id] with id not in db", function (done) {
        const id = nanoid();
        chai
          .request(serverURL)
          .get(api + "/" + id)
          .end((err, res) => {
            assert.ifError(err);
            assert.strictEqual(res.status, 200);
            const b = res.body;
            assert.strictEqual(b, "no book exists");
            return done();
          });
      });

      test("Test GET /api/books/[id] with valid id in db", function (done) {
        createBookAndThen(done, (book) => {
          chai
            .request(serverURL)
            .get(`${api}/${book._id}`)
            .end((err, res) => {
              assert.ifError(err);
              assert.strictEqual(res.status, 200);
              const b = res.body;
              assert.strictEqual(b._id, book._id);
              assert.strictEqual(b.title, book.title);
              return done();
            });
        });
      });
    });

    suite(
      "POST /api/books/[id] => add comment/expect book object with id",
      function () {
        test("Test POST /api/books/[id] with comment", function (done) {
          createBookAndThen(done, (book) => {
            const comment = nanoid();
            chai
              .request(serverURL)
              .post(`${api}/${book._id}`)
              .type("form")
              .send({ comment })
              .end((err, res) => {
                assert.ifError(err);
                assert.strictEqual(res.status, 200);
                const b = res.body;
                assert.include(b.comments, comment);
                assert.isAbove(b.commentcount, 0);
                return done();
              });
          });
        });

        test("Test POST /api/books/[id] without comment field", function (done) {
          createBookAndThen(done, (book) => {
            chai
              .request(serverURL)
              .post(`${api}/${book._id}`)
              .end((err, res) => {
                assert.ifError(err);
                assert.strictEqual(res.status, 200);
                const b = res.body;
                assert.strictEqual(b, "missing required field comment");
                return done();
              });
          });
        });

        test("Test POST /api/books/[id] with comment, id not in db", function (done) {
          createBookAndThen(done, (book) => {
            chai
              .request(serverURL)
              .post(`${api}/${nanoid()}`)
              .type("form")
              .send({ comment: nanoid() })
              .end((err, res) => {
                assert.ifError(err);
                assert.strictEqual(res.status, 200);
                const b = res.body;
                assert.strictEqual(b, "no book exists");
                return done();
              });
          });
        });
      }
    );

    suite("DELETE /api/books/[id] => delete book object id", function () {
      test("Test DELETE /api/books/[id] with valid id in db", function (done) {
        createBookAndThen(done, (book) => {
          chai
            .request(serverURL)
            .delete(`${api}/${book._id}`)
            .end((err, res) => {
              assert.ifError(err);
              assert.strictEqual(res.status, 200);
              const b = res.body;
              assert.strictEqual(b, "delete successful");

              chai
                .request(serverURL)
                .get(`${api}/${book._id}`)
                .end((err, res) => {
                  assert.ifError(err);
                  assert.strictEqual(res.status, 200);
                  const b = res.body;
                  assert.strictEqual(b, "no book exists");
                  return done();
                });
            });
        });
      });

      test("Test DELETE /api/books/[id] with  id not in db", function (done) {
        chai
          .request(serverURL)
          .delete(`${api}/${nanoid()}`)
          .end((err, res) => {
            assert.ifError(err);
            assert.strictEqual(res.status, 200);
            const b = res.body;
            assert.strictEqual(b, "no book exists");
            return done();
          });
      });
    });
  });
});

const createBookAndThen = (done, cb) => {
  const title = nanoid();
  chai
    .request(serverURL)
    .post(api)
    .type("form")
    .send({ title })
    .end((err, res) => {
      assert.ifError(err);
      assert.strictEqual(res.status, 200);
      cb(res.body);
    });
};
