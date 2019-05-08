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
        if (res.body.length > 0) {
          res.body[0].should.have.property("id").to.be.a("number");
          res.body[0].should.have.property("name").to.be.a("string");
        }
        done();
      });
  });
});
