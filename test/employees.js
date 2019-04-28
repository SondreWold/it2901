let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
let should = chai.should();

chai.use(chaiHttp);

var length = 0;

describe("/GET employees", () => {
  it("it should GET all employees", done => {
    chai
      .request(server)
      .get("/api/employee/")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.above(length);
        length = res.body.length;
        done();
      });
  });
});
