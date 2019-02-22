context("Network Requests", () => {
  it("cy.request()", () => {
    cy.request("http://localhost:5000/api/unit").should(result => {
      expect(result.status).to.eq(200);
    });
  });
});
