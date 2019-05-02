let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
let should = chai.should();

chai.use(chaiHttp);

describe("/GET house", () => {
  it("should GET house", done => {
    chai
      .request(server)
      .get("/api/house/")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body[0].should.have.property("id");
        res.body[0].should.have.property("unit_id");
        res.body[0].should.have.property("name");
        done();
      });
  });
});
