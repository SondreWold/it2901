/*

E2E test for registering absence of children.
Test that the increment and decrement button works, and that the ratio is updated.

1. Click the decrement button
2. Check that ratio number has changed
3. Click the increment button
4. Check that ratio number is back to its initial value

Expected behaviour: the decrement should change the ratio, and the increment should turn it back to normal

*/
describe("Register children absence", function(){
	const childrenHolder = '.childAbsentButton';
	
	function increment() {
  	cy.get(childrenHolder)
  		.eq(0)
  		.click()
	}

	function decrement() {
  	cy.get(childrenHolder)
  		.eq(1)
  		.click()
	}

	function getRatio() {
		return cy.get('.employeesNeeded > i').first().invoke('text')
	}

	function getTotalRatio() {
		return cy.get('.totalChildren .totalText').invoke('text')
	}

  // saves the initial value of the ratio of the first base card
	before( function(){
    cy.visit('localhost:3000/')
		getRatio().as('initialRatio')
	})

	beforeEach( function (){
    cy.viewport(1400, 1000)
    cy.visit('localhost:3000/')
    getTotalRatio().as('totalRatio')
	})

  it("decrement the number of children updates the ratio", function(){		
  	decrement()
  	getRatio()
			.should('not.contain', this.initialRatio)
  });

  it("increment the number of children reverts the ratio", function(){		
  	increment()
  	getRatio()
			.should('contain', this.initialRatio)
  });

  // HOW TO FORCE AN UPDATE?
  it("increment / decrement updates total counter", function() {
  	// getTotalRatio().then($ratio) => () { }
		
		increment()
  	decrement()
  	getTotalRatio()
  		.should('not.contain', this.totalRatio)
  });
});