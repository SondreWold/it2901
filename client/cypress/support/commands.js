import { drag, drop } from '../commands/dragAndDrop';

Cypress.Commands.add('drag', { prevSubject: 'element' }, drag);
Cypress.Commands.add('drop', { prevSubject: 'element' }, drop);