/*

E2E test for drag and drop functionality.
Tests that drags an employee from one base to another and verifies that the correct base is updated

1. Click an employee (mousedown event)
2. Drag / move the cursor to another base container (move cursor)
3. Mouseup event to drop the emplpoyee in the correct container

Expected behaviour: the "drag container" should have one employee less.
The "drop container" should have one more

*/
describe("Drag and drop employees", function(){
	const draggable = '[data-react-beautiful-dnd-draggable]';
	const droppable = '[data-react-beautiful-dnd-droppable]';

  beforeEach(function(){
      cy.viewport(1400, 1000)
      cy.visit('localhost:3000/')
      cy.get(draggable).first().invoke('text').as('emp')
  })

  it("drag an employee from the first base to the last", function(){		
  	cy.get(draggable)
  		.first()
 			.drag()

	  cy.get(droppable)
	  	.last()
	  	.drop()
	  	.wait(500)
	  	.contains(this.emp)
  });
});