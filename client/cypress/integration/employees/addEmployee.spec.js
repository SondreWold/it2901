/*

E2E test for registering a new employee.

1. Click icon to open registration popup
2. Fill in relevant fields
3. Submit
4. Check if list of employees contains newly registered employee

Expected behaviour: the new employee should be found in list of employees

*/

describe("Register new employee", () => {
	const firstName = "Cyp";
	const lastName = "Ress" + Math.round(Math.random(10)*10000);
	const fullName = firstName + " " + lastName;
	const dialog = "div[role='dialog']";
	const employeeList = ".detailsContainer nav";
  
	function search(input) {
		cy.get("#outlined-full-width")
      .type(input)
      .type("{enter}");
	}

	before( function () {
		cy.viewport(1400, 1000)
		cy.visit("localhost:3000/employees")
	});

  it("opens the registration dialog", () => {
		cy.get('body')
			.should('not.contain', dialog)
  	cy.get('.employeeListTop button')
  		.click()
  		.wait(500)
  	cy.get('body')
  		.find(dialog)
  });


  it("registers a temp employee", () => {

  	cy.get("#firstName")
      .type(firstName)
    cy.get("#lastName")
    	.type(lastName)
  	cy.get(dialog + " form")
  		.submit()
  	cy.get(employeeList)
  		.first()
  		.should("contain", fullName)
  });

  it("deletes an employee", () => {
  	cy.get(employeeList)
  		.first()
  		.contains(fullName)
  		.click()
		cy.get(".employeeButtonsHolder button")
			.last()
			.click()
		cy.get(employeeList)
			.should("not.contain", fullName)
  });
});
