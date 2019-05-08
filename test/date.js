let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
let should = chai.should();

chai.use(chaiHttp);

describe("/GET date", () => {
  it("should GET created date for kindergarten", done => {
    chai
      .request(server)
      .get("/api/minDate")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        if (res.body.length > 0) {
          res.body[0].should.have.property("created_date");
        }
        done();
      });
  });
});
