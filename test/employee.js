let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("..");
let moment = require("moment");
let should = chai.should();

chai.use(chaiHttp);

ran = max => {
  return Math.floor(Math.random() * max + 1);
};

let maxId;

const employee = {
  firstName: "test_firstname" + ran(1000),
  lastName: "test_lastname" + ran(1000),
  baseId: ran(4),
  position: ran(2),
  startDate: moment(
    new Date(parseInt("20" + ran(99)), ran(12), ran(30))
  ).format("YYYY-MM-DD")
};

describe("/POST employee", () => {
  it("should not add an employee without first name", done => {
    let emp_no_fn = JSON.parse(JSON.stringify(employee));
    delete emp_no_fn["firstName"];
    chai
      .request(server)
      .post("/api/employee/")
      .send(emp_no_fn)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        res.body.should.have.property("name").eql("error");
        done();
      });
  });
  it("should add a new employee", done => {
    chai
      .request(server)
      .post("/api/employee/")
      .send(employee)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have
          .property("message")
          .eql(`Inserted employee ` + employee.firstName);
        res.body.should.have.property("employee").to.be.a("object");
        res.body.employee.should.have
          .property("firstName")
          .to.be.a("string")
          .eql(employee.firstName);
        res.body.employee.should.have
          .property("lastName")
          .to.be.a("string")
          .eql(employee.lastName);
        res.body.employee.should.have
          .property("baseId")
          .to.be.a("number")
          .eql(employee.baseId);
        res.body.employee.should.have
          .property("position")
          .to.be.a("number")
          .eql(employee.position);
        res.body.employee.should.have
          .property("startDate")
          .to.be.a("string")
          .eql(employee.startDate);
        done();
      });
  });
});

describe("/GET employees", () => {
  it("should GET all employees", done => {
    chai
      .request(server)
      .get("/api/employee/")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.above(0);
        res.body[0].should.have.property("first_name").to.be.a("string");
        res.body[0].should.have.property("last_name").to.be.a("string");
        res.body[0].should.have.property("base_id").to.be.a("number");
        res.body[0].should.have.property("position").to.be.a("number");
        done();
      });
  });
  it("should GET latest inserted employee id", done => {
    chai
      .request(server)
      .get("/api/employee/latest/")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body[0].should.have.property("max");
        maxId = res.body[0].max;
        done();
      });
  });
  it("should GET specific employee", done => {
    chai
      .request(server)
      .get("/api/employee/id/" + maxId)
      .end((err, res) => {
        if (res.body.first_name !== employee.firstName) {
          maxId = null;
        }
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have
          .property("first_name")
          .to.be.a("string")
          .eql(employee.firstName);
        res.body.should.have
          .property("last_name")
          .to.be.a("string")
          .eql(employee.lastName);
        res.body.should.have
          .property("base_id")
          .to.be.a("number")
          .eql(employee.baseId);
        res.body.should.have
          .property("position")
          .to.be.a("number")
          .eql(employee.position);
        done();
      });
  });
  it("should GET working employees", done => {
    chai
      .request(server)
      .get("/api/employee/work/date/" + employee.startDate)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
  it("should GET free temps", done => {
    chai
      .request(server)
      .get("/api/employee/date/" + employee.startDate)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        if (res.body.length > 0) {
          res.body[0].should.have.property("first_name").to.be.a("string");
          res.body[0].should.have.property("last_name").to.be.a("string");
          res.body[0].should.have
            .property("position")
            .to.be.a("number")
            .eql(2);
        }
        done();
      });
  });
  it("should GET employee from search", done => {
    chai
      .request(server)
      .get("/api/employee/" + employee.firstName + " " + employee.lastName)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(1);
        res.body[0].should.have
          .property("first_name")
          .to.be.a("string")
          .eql(employee.firstName);
        res.body[0].should.have
          .property("last_name")
          .to.be.a("string")
          .eql(employee.lastName);
        res.body[0].should.have
          .property("id")
          .to.be.a("number")
          .eql(maxId);

        done();
      });
  });
});

describe("/PUT employee", () => {
  it("should UPDATE an employee", done => {
    let editedEmployee = {
      firstName: employee.firstName + "edit",
      lastName: employee.lastName + "edit",
      position: Math.ceil(employee.position / 2),
      baseId: Math.ceil(employee.baseId / 2),
      startDate: employee.startDate
    };
    chai
      .request(server)
      .put("/api/employee/id/" + maxId)
      .send(editedEmployee)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("message").eql("Edited employee");
        res.body.should.have.property("employee");
        res.body.employee.should.have
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
          .eql(editedEmployee.baseId);
        done();
      });
  });
});

describe("/DELETE employee", () => {
  it("should DELETE an employee", done => {
    chai
      .request(server)
      .delete("/api/employee/id/" + maxId)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
