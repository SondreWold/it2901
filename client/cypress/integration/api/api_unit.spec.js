context("Network Requests", () => {
  it("cy.request()", () => {
    cy.request("http://localhost:3000/api/unit").should(result => {
      expect(result.status).to.eq(200);
    });
  });
});
