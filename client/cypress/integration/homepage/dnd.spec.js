/*

E2E test for drag and drop functionality.
Tests that drags an employee from one base to another and verifies that the correct base is updated

1. Click an employee (mousedown event)
2. Drag / move the cursor to another base container (move cursor)
3. Mouseup event to drop the emplpoyee in the correct container
4. Perform steps [1-3] again in the opposite order to obtain the same structure

Expected behaviour: the "drag container" should have one employee less.
The "drop container" should have one more

__________________

Notes:

see ../commands/dragAndDrop.js for the drag() and drop() functions

*/
describe("Drag and drop employees", function(){
	const draggable = '[data-react-beautiful-dnd-draggable]';
	const droppable = '[data-react-beautiful-dnd-droppable]';

  beforeEach(function(){
      cy.viewport(1400, 1000)
      cy.visit('localhost:3000/')
      cy.get(draggable).first().invoke('text').as('firstEmp')
      cy.get(draggable).last().invoke('text').as('lastEmp')
  })

  it("move the first employee in the first base to the last base", function(){		

  	// check if first base contains the employee in question
		cy.get(droppable)
  		.first()
  		.should('contain', this.firstEmp)

  	// perform the drag action
  	cy.get(draggable)
  		.first()
 			.drag()

 		// drop in last base and check if container contains the employee
	  cy.get(droppable)
	  	.last()
	  	.drop()
	  	.wait(500)
	  	.should('contain', this.firstEmp)

	  // employee should not be in first container anymore
	  cy.get(droppable)
	  	.first()
	  	.should('not.contain', this.firstEmp)
  });

  it("move the last employee of the last base to the first base", function(){		

  	// check if last base contains the employee in question
		cy.get(droppable)
  		.last()
  		.should('contain', this.lastEmp)

  	// perform the drag action
  	cy.get(draggable)
  		.last()
 			.drag()

 		// drop in first base and check if container contains the employee
	  cy.get(droppable)
	  	.first()
	  	.drop()
	  	.wait(500)
	  	.should('contain', this.lastEmp)

	  // employee should not be in last container anymore
	  cy.get(droppable)
	  	.last()
	  	.should('not.contain', this.lastEmp)
  });
});