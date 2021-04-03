const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const nanoid = require("nanoid").nanoid;

const port = process.env.PORT;
const serverURL = `http://localhost:${
  port ? port : 3000
}/infosec/bulletin-board`;

chai.use(chaiHttp);

suite("Functional Tests", function () {
  suite("/api/boards", () => {
    test("GET with any name should success", (done) => {
      const api = "/api/boards";
      const name = nanoid();
      chai
        .request(serverURL)
        .get(`${api}/${name}`)
        .end((err, res) => {
          assert.ifError(err);
          assert.strictEqual(res.status, 200);
          assert.strictEqual(res.body.name, name);
          return done();
        });
    });
  });

  suite("/api/threads", () => {
    const api = "/api/threads";
    const boardName = nanoid();

    const postMissingField = (thread, done) => {
      post(thread, done, (res) => {
        assert.strictEqual(res.status, 400);
        assert.match(res.body.error, /^missing .*$/);
      });
    };

    const post = (thread, done, validate) => {
      chai
        .request(serverURL)
        .post(`${api}/${boardName}`)
        .type("form")
        .send(thread)
        .end((err, res) => {
          assert.ifError(err);
          if (validate) validate(res);
          if (done) done();
        });
    };

    const postMany = (n, done, validate) => {
      if (n <= 0) {
        if (validate) validate();
        if (done) done();
        return;
      }
      n--;
      post({ text: nanoid(), delete_password: nanoid() }, null, () => {
        postMany(n, done, validate);
      });
    };

    test("POST should fail for missing text", (done) => {
      postMissingField({ delete_password: nanoid() }, done);
    });

    test("POST should fail for missing password", (done) => {
      postMissingField({ text: nanoid() }, done);
    });

    test("POST should ok", (done) => {
      const thread = { text: nanoid(), delete_password: nanoid() };
      post(thread, done, (res) => {
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.body.text, thread.text);
        assert.strictEqual(res.body.deletePassword, thread.delete_password);
      });
    });

    test("GET should fail for non existed thread ID", (done) => {
      const threadName = nanoid();
      chai
        .request(serverURL)
        .get(`${api}/${boardName}/${threadName}`)
        .end((err, res) => {
          assert.ifError(err);
          assert.strictEqual(res.status, 404);
          return done();
        });
    });

    test("GET single thread should ok", (done) => {
      const thread = { text: nanoid(), delete_password: nanoid() };
      post(thread, null, (postRes) => {
        const id = postRes.body.id;
        chai
          .request(serverURL)
          .get(`${api}/${boardName}/${id}`)
          .end((err, res) => {
            assert.ifError(err);
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body.id, id);
            return done();
          });
      });
    });

    test("GET top 10 threads should ok", (done) => {
      postMany(11, null, () => {
        chai
          .request(serverURL)
          .get(`${api}/${boardName}`)
          .end((err, res) => {
            assert.ifError(err);
            assert.strictEqual(res.status, 200);
            assert.isArray(res.body);
            assert.strictEqual(res.body.length, 10);
            return done();
          });
      });
    });
  });

  suite("/api/replies", () => {
    const api = "/api/replies";
  });
});
