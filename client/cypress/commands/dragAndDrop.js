// From @abzainuddin: https://github.com/atlassian/react-beautiful-dnd/issues/162

const sloppyClickThreshold = 10;
const primaryButton = 0;

export function drag(subject) {
    const coords = subject[0].getBoundingClientRect();

    // Hoops we need to jump through to register a mouse drag.
    cy.wrap(subject)
        .trigger('mousedown', {
            // Hoop for checking primary button.
            button: primaryButton,

            // Register clientX + clientY for sloppy click detection in
            // subsequent mousemove.
            clientX: coords.left,
            clientY: coords.top
        })
        .trigger('mousemove', {
            button: primaryButton,

            // Make sure we pass sloppyClickThreshold detection.
            clientX: coords.left + sloppyClickThreshold,
            clientY: coords.top
        })
};

export function drop(subject) {
    cy.wrap(subject)
        .trigger('mousemove', { button: primaryButton })
        .trigger('mouseup');
};