/// <reference types="cypress" />


Cypress.Commands.add('getByTestId', (id: string) => {
    cy.get(`[data-testid=${id}]`);
});

declare global {
    namespace Cypress {
        interface Chainable {
            getByTestId(id: string): Chainable<Element>
        }
    }
}

export {} // for prevent errors, nothing export