let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
let should = chai.should();

chai.use(chaiHttp);

describe("/GET navigatiton", () => {
  it("should GET kindergarten name", done => {
    chai
      .request(server)
      .get("/api/navigation/")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        if (res.body.length > 0) {
          res.body[0].should.have.property("name").to.be.a("string");
        }
        done();
      });
  });
});
