describe("API requests", () => {

  it("expect HTTP 200 from employees absence API", () => {
    cy.request("http://localhost:3000/api/absence/employees").should(result => {
      expect(result.status).to.eq(200);
    });
  });

  it("expect HTTP 200 from children absence API", () => {
    cy.request(
      "http://localhost:3000/api/absence/children/date/2019-02-19"
    ).should(result => {
      expect(result.status).to.eq(200);
    });
  });

  it("expect HTTP 200 from base API", () => {
    cy.request("http://localhost:3000/api/base").should(result => {
      expect(result.status).to.eq(200);
    });
  });

  it("expect HTTP 200 from employee API", () => {
    cy.request("http://localhost:3000/api/employee").should(result => {
      expect(result.status).to.eq(200);
    });
  });

  it("expect HTTP 200 from house API", () => {
    cy.request("http://localhost:3000/api/house").should(result => {
      expect(result.status).to.eq(200);
    });
  });

  it("expect HTTP 200 from unit API", () => {
    cy.request("http://localhost:3000/api/unit").should(result => {
      expect(result.status).to.eq(200);
    });
  });

});
