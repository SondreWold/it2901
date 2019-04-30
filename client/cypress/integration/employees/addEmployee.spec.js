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
	const employeeList = ".employeeList";
  
	function search(input) {
		cy.get("#outlined-full-width")
      .type(input)
      .type("{enter}");
	}

	function clearSearch() {
		cy.get("#outlined-full-width").clear()
	}

	before( function () {
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
  		.should("contain", fullName)
		cy.get('#empTitle')
			.should("contain", fullName)
  });

  it("searches for the registered employee", () => {
  	search(fullName)
  	cy.get(employeeList)
  		.contains(fullName)
  	clearSearch()
  });

  it("deletes the same employee that was registered", () => {
  	cy.get(".employeeButtonsHolder button")
			.last()
			.click()
			.wait(500)
		cy.get(employeeList)
			.should("not.contain", fullName)
  });
});
