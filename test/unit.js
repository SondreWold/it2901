let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
let should = chai.should();

chai.use(chaiHttp);

describe("/GET unit", () => {
  it("should GET unit", done => {
    chai
      .request(server)
      .get("/api/unit/")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body[0].should.have.property("id");
        res.body[0].should.have.property("name");
        done();
      });
  });
});
