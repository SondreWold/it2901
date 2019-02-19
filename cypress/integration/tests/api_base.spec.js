context("Network Requests", () => {
  it("cy.request()", () => {
    cy.request("http://localhost:5000/api/base").should(result => {
      expect(result.status).to.eq(200);
    });
  });
});
