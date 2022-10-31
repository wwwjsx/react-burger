describe('open and close ingredient modal', () => {
    before(() => {
        cy.visit('/');
    });

    it('open ingredient details modal, verify data and close', () => {
        let ingredientId;

        cy.intercept('GET', '/api/ingredients').as('ingredients');

        // should wait till request done
        cy.wait('@ingredients')
            .its('response.statusCode')
            .should('eq', 200);

        // get ingredients bun first item
        cy.getByTestId('ingredients-bun').find('div').first().as('firstItem');

        cy.get('@firstItem').then(el => {
            ingredientId = el.attr('data-id');

            expect(ingredientId).not.empty;
        });

        // open ingredient modal
        cy.get('@firstItem').click();

        cy.get('#react-modals').as('modal');
        cy.get('@modal').getByTestId('ingredient-details').as('details');

        cy.get('@details').should('exist');

        // check ingredient properties value
        cy.get('@details').getByTestId('name').should('not.be.empty');
        cy.get('@details').getByTestId('calories').should('not.be.empty');
        cy.get('@details').getByTestId('proteins').should('not.be.empty');
        cy.get('@details').getByTestId('fat').should('not.be.empty');
        cy.get('@details').getByTestId('carbohydrates').should('not.be.empty');

        // close ingredient modal window
        cy.get('@modal').getByTestId('close').first().click();

        // check ingredient details modal DOM exists
        cy.get('@details').should('not.exist');
    });
});