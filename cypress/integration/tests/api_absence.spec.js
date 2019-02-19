context("Network Requests", () => {
  it("cy.request()", () => {
    cy.request("http://localhost:5000/api/absence/employees").should(result => {
      expect(result.status).to.eq(200);
    });
  });

  it("cy.request()", () => {
    cy.request("http://localhost:5000/api/absence/children").should(result => {
      expect(result.status).to.eq(200);
    });
  });
});
