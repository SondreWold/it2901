context("Network Requests", () => {
  it("cy.request()", () => {
    cy.request("http://localhost:3000/api/absence/employees").should(result => {
      expect(result.status).to.eq(200);
    });
  });

  it("cy.request()", () => {
    cy.request(
      "http://localhost:3000/api/absence/children/date/2019-02-19"
    ).should(result => {
      expect(result.status).to.eq(200);
    });
  });
});
