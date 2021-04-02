const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
let port = process.env.PORT;
const serverURL = `http://localhost:${port ? port : 3000}/qa/lib`;

chai.use(chaiHttp);

suite("Functional Tests", () => {});
