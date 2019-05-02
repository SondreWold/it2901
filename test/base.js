let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
let should = chai.should();

chai.use(chaiHttp);

let base;

describe("/GET bases", () => {
  it("should GET bases", done => {
    chai
      .request(server)
      .get("/api/base/")
      .end((err, res) => {
        base = res.body[0];
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body[0].should.have.property("id");
        res.body[0].should.have.property("name");
        res.body[0].should.have.property("house_id");
        res.body[0].should.have.property("total_children");
        res.body[0].should.have.property("ratio");

        done();
      });
  });
  it("should GET specific base", done => {
    chai
      .request(server)
      .get("/api/base/" + base.id)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body[0].should.have.property("id").eql(base.id);
        res.body[0].should.have.property("name").eql(base.name);
        res.body[0].should.have.property("house_id").eql(base.house_id);
        res.body[0].should.have
          .property("total_children")
          .eql(base.total_children);
        res.body[0].should.have.property("ratio").eql(base.ratio);

        done();
      });
  });
});
