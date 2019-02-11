context("Network Requests", () => {
  it("cy.request()", () => {
    cy.request("http://localhost:5000/working").should(result => {
      expect(result.status).to.eq(200);
    });
  });
});
