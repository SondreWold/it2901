/*

E2E test for no-result search.
Tests that a search for "aksdjladjlajsd" returns an empty result 

1. Select search field
2. Search for "aksdjladjlajsd"
3. Control that an empty result set is returned from db

Expected behaviour: "No movies found" should be rendered 

*/

describe("bogus search test", () => {
  it("Force no result search", () => {
    cy.visit("localhost:3000/employees");
    cy.get("#outlined-full-width")
      .type("aksdjladjlajsd")
      .type("{enter}");
    cy.contains("Fant ingen ansatte...");
  });
});
