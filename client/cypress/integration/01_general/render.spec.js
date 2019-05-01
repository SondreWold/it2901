describe("Render", () => {
  
  it("render front page", () => {
    cy.visit("localhost:3000/");
    cy.contains("Barn tilstede");
    cy.contains("Voksne tilstede");
    cy.contains("Fraværende");
  });

  it("render employee page", () => {
    cy.visit("localhost:3000/employees");
    cy.contains("Ansatte");
    cy.contains("Fast ansatt");
    cy.contains("Vikar");
  });

  it("render statistics page", () => {
    cy.visit("localhost:3000/stats")
    cy.contains("Overbemanning og underbemanning")
  });

  it("render settings page", () => {
    cy.visit("localhost:3000/settings")
  });
});
