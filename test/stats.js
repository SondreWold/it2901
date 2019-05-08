let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
let should = chai.should();

chai.use(chaiHttp);

describe("/GET stats", () => {
  it("should GET ratio", done => {
    chai
      .request(server)
      .get("/api/stats/getRatio/2019-04-01/2019-04-30")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        if (res.body.length > 0) {
          res.body[0].should.have.property("date").to.be.a("string");
          res.body[0].should.have.property("base_id").to.be.a("number");
          res.body[0].should.have.property("ratio").to.be.a("number");
          res.body[0].should.have.property("name").to.be.a("string");
        }
        done();
      });
  });
  it("should GET absent employees per month", done => {
    chai
      .request(server)
      .get("/api/stats/absentEmpsPerMonth/4")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        if (res.body.length > 0) {
          res.body[0].should.have.property("date").to.be.a("string");
          res.body[0].should.have.property("count").to.be.a("number");
        }
        done();
      });
  });
});

/*describe("/PUT employee", () => {
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
          .eql(editedEmployee.firstName);
        res.body.employee.should.have
          .property("lastName")
          .eql(editedEmployee.lastName);
        res.body.employee.should.have
          .property("position")
          .eql(editedEmployee.position);
        res.body.employee.should.have
          .property("baseId")
          .eql(editedEmployee.baseId);
        done();
      });
  });
});*/
