let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
let moment = require("moment");
let should = chai.should();

chai.use(chaiHttp);

ran = max => {
  return Math.floor(Math.random() * max + 1);
};

let movedEmployee = {
  date: "2019-05-01",
  employeeId: null,
  baseId: null
};

let differenttBase;

describe("/GET data for moved employee from employee and base", () => {
  it("should GET a free temp", done => {
    chai
      .request(server)
      .get("/api/employee/date/2019-05-01")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.above(0);
        res.body[0].should.have.property("id").to.be.a("number");
        movedEmployee.employeeId = res.body[0].id;
        done();
      });
  });
  it("should GET a base", done => {
    chai
      .request(server)
      .get("/api/base/")
      .end((err, res) => {
        base = res.body[0];
        res.should.have.status(200);
        res.body.length.should.be.above(1);
        res.body[0].should.have.property("id").to.be.a("number");
        movedEmployee.baseId = res.body[0].id;
        differenttBase = res.body[1].id;
        done();
      });
  });
});

describe("/POST moved employee", () => {
  it("should not add a moved employee without employeeId", done => {
    let moved_emp_no_id = JSON.parse(JSON.stringify(movedEmployee));
    delete moved_emp_no_id["employeeId"];
    chai
      .request(server)
      .post("/api/employee/")
      .send(moved_emp_no_id)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        res.body.should.have.property("name").eql("error");
        done();
      });
  });
  it("should add a moved employee", done => {
    chai
      .request(server)
      .post("/api/moved/")
      .send(movedEmployee)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have
          .property("message")
          .eql(`Inserted moved employee ` + movedEmployee.employeeId);
        res.body.movedEmployee.should.have
          .property("employeeId")
          .to.be.a("number")
          .eql(movedEmployee.employeeId);
        res.body.movedEmployee.should.have
          .property("baseId")
          .to.be.a("number")
          .eql(movedEmployee.baseId);
        done();
      });
  });
});

describe("/GET moved employees", () => {
  it("should GET moved employees", done => {
    chai
      .request(server)
      .get("/api/moved/" + movedEmployee.date)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.above(0);
        done();
      });
  });
});

describe("/PUT moved employee", () => {
  it("should UPDATE a moved employee", done => {
    chai
      .request(server)
      .put(
        "/api/moved/" +
          differenttBase +
          "/" +
          movedEmployee.employeeId +
          "/" +
          movedEmployee.date
      )
      .end((err, res) => {
        res.should.have.status(200);
        /*res.body.should.have.property("message").eql("Edited employee");
        res.body.should.have.property("employee");*/
        /*res.body.employee.should.have
          .property("firstName")
          .to.be.a("string")
          .eql(editedEmployee.firstName);
        res.body.employee.should.have
          .property("lastName")
          .to.be.a("string")
          .eql(editedEmployee.lastName);
        res.body.employee.should.have
          .property("position")
          .to.be.a("number")
          .eql(editedEmployee.position);
        res.body.employee.should.have
          .property("baseId")
          .to.be.a("number")
          .eql(editedEmployee.baseId);*/
        done();
      });
  });
});

describe("/DELETE moved employee", () => {
  it("should DELETE an employee", done => {
    chai
      .request(server)
      .delete(
        "/api/moved/employeeId/" +
          movedEmployee.employeeId +
          "/date/" +
          movedEmployee.date
      )
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
