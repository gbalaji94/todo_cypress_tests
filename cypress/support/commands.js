// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************



Cypress.Commands.add("addNote", (locator, value) => {
    cy.get(locator)
        .type(value)
        .should('have.value', value)
        .type('{enter}')
})

Cypress.Commands.add("updateNote", (locator, value) => {
    cy.wait(500)
    cy.get(locator)
        .clear()
        .type(value)
        .should('have.value', value)
        .type('{enter}')
})
