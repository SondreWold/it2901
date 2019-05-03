let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("..");
let should = chai.should();

chai.use(chaiHttp);

let base;
let editedBase;

describe("/GET bases", () => {
  it("should GET bases", done => {
    chai
      .request(server)
      .get("/api/base/")
      .end((err, res) => {
        base = res.body[0];
        res.should.have.status(200);
        res.body.should.be.a("array");
        if (res.body.length > 0) {
          res.body[0].should.have.property("id");
          res.body[0].should.have.property("name");
          res.body[0].should.have.property("house_id");
          res.body[0].should.have.property("total_children");
          res.body[0].should.have.property("ratio");
        }

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
        if (res.body.length > 0) {
          res.body[0].should.have.property("id").eql(base.id);
          res.body[0].should.have.property("name").eql(base.name);
          res.body[0].should.have.property("house_id").eql(base.house_id);
          res.body[0].should.have
            .property("total_children")
            .eql(base.total_children);
          res.body[0].should.have.property("ratio").eql(base.ratio);
        }
        done();
      });
  });
});

describe("/PUT bases", () => {
  it("should UPDATE a base", done => {
    editedBase = {
      name: "editedBase",
      total_children: 2,
      ratio: 0.1337
    };
    chai
      .request(server)
      .put("/api/settings/base/" + base.id)
      .send(editedBase)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("message").eql("Edited base");
        res.body.should.have.property("base");
        res.body.base.should.have
          .property("id")
          .to.be.a("number")
          .eql(base.id);
        res.body.base.should.have
          .property("name")
          .to.be.a("string")
          .eql(editedBase.name);
        res.body.base.should.have
          .property("total_children")
          .to.be.a("number")
          .eql(editedBase.total_children);
        res.body.base.should.have
          .property("ratio")
          .to.be.a("number")
          .eql(editedBase.ratio);
        done();
      });
  });
  it("should be updated", done => {
    chai
      .request(server)
      .get("/api/base/" + base.id)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        if (res.body.length > 0) {
          res.body[0].should.have.property("id").eql(base.id);
          res.body[0].should.have.property("name").eql(editedBase.name);
          res.body[0].should.have.property("house_id").eql(base.house_id);
          res.body[0].should.have
            .property("total_children")
            .eql(editedBase.total_children);
          res.body[0].should.have.property("ratio").eql(editedBase.ratio);
        }
        done();
      });
  });
  it("should reset the base properites", done => {
    chai
      .request(server)
      .put("/api/settings/base/" + base.id)
      .send(base)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("message").eql("Edited base");
        res.body.should.have.property("base");
        res.body.base.should.have
          .property("id")
          .to.be.a("number")
          .eql(base.id);
        res.body.base.should.have
          .property("name")
          .to.be.a("string")
          .eql(base.name);
        res.body.base.should.have
          .property("total_children")
          .to.be.a("number")
          .eql(base.total_children);
        res.body.base.should.have
          .property("ratio")
          .to.be.a("number")
          .eql(base.ratio);
        done();
      });
  });
});
