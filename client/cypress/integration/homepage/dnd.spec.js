/*

E2E test for drag and drop functionality.
Tests that drags an employee from one base to another and verifies that the correct base is updated

1. Click an employee (mousedown event)
2. Drag / move the cursor to another base container (move cursor)
3. Mouseup event to drop the emplpoyee in the correct container

Expected behaviour: the "drag container" should have one employee less.
The "drop container" should have one more

*/
describe("Drag and drop employees", () => {

  it("drag an employee from the first base to the second", () => {
  	cy.get('[data-react-beautiful-dnd-draggable]')
  		.first()
  		.drag()
  		.wait(500)
	  cy.get('[data-react-beautiful-dnd-droppable]')
	  	.last()
	  	.drop();
  });

  beforeEach(function(){
      cy.viewport(1400, 1000)
      cy.visit('localhost:3000/')
  })
});