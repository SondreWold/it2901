describe("Employee list should not be empty", () => {
  it("Find first employee from list", () => {
    cy.visit("localhost:3000/employees");
    cy.get("#empText").click({ multiple: true });
  });
});
