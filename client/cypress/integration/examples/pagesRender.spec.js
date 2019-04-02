describe("Render", () => {
  it("Load front page", () => {
    cy.visit("localhost:3000/");
  });
});

describe("Render", () => {
  it("Load employee page", () => {
    cy.visit("localhost:3000/employees");
  });
});

describe("Render", () => {
  it("Load statistics page", () => {
    cy.visit("localhost:3000/stats");
  });
});

describe("Render", () => {
  it("Load settings page", () => {
    cy.visit("localhost:3000/settings");
  });
});
