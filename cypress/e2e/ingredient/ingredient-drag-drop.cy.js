describe('ingredient drag and drop, register order', () => {
    const dataTransfer = new DataTransfer();
    const maxIngredients = 3;
    let totalOrderPrice = 0;
    let totalIngredientPrice = 0;

    before(() => {
        cy.visit('/');
    });

    it('load ingredients', () => {
        cy.intercept('GET', '/api/ingredients').as('ingredients');

        // should wait till request done
        cy.wait('@ingredients')
            .its('response.statusCode')
            .should('eq', 200);
    });

    it('should drag ingredients to constructor', () => {
        cy.getByTestId('constructor').as('constructor');
        cy.getByTestId('ingredients').as('ingredients');
        cy.get('@constructor').getByTestId('dropBox').as('dropBox');
        cy.get('@ingredients').getByTestId('ingredients-bun').children().eq(1).as('secondBun');

        cy.get('@secondBun').should('exist');
        cy.get('@secondBun').trigger('dragstart', () => {
            dataTransfer
        });
        cy.get('@dropBox').trigger('drop', () => {
            dataTransfer;
        });

        // move 3 main ingredients
        cy.get('@ingredients').getByTestId('ingredients-main').children().each((item, index) => {
            if (index < maxIngredients) {
                cy.get(item).trigger('dragstart', () => {
                    dataTransfer
                });

                cy.get('@dropBox').trigger('drop', () => {
                    dataTransfer;
                });
            }
        });

        // move 3 sauce ingredients
        cy.get('@ingredients').getByTestId('ingredients-sauce').children().each((item, index) => {
            if (index < maxIngredients) {
                cy.get(item).trigger('dragstart', () => {
                    dataTransfer
                });

                cy.get('@dropBox').trigger('drop', () => {
                    dataTransfer
                });
            }
        });

        cy.get('@constructor').getByTestId('order-total-price').invoke('text').then((text) => {
            totalOrderPrice = Number(text);
        }).then(() => {
            cy.get('@dropBox').find('[data-ref-type="ingredient"]').each((item) => {
                const price = Number(item.data('ref-price'));

                if (price > 0) {
                    totalIngredientPrice += price;
                }
            });
        }).then(() => {
            expect(totalOrderPrice).to.be.equal(totalIngredientPrice);
        });
    });

    it('should register order', () => {
        cy.get('button').contains('Оформить заказ').as('button');
        cy.get('@button').click();

        // should check login form exists after click button
        cy.get('body').then(($body) => {
            const isForm = $body.find('[data-testid="form-login"]').length > 0;

            if (isForm) {
                cy.get('div.input_type_email div.input__icon-action').click();
                cy.get('input[name="email"]').type('u.abulkasimov@yandex.ru');
                cy.get('input[name="password"]').type('1234567');
                cy.get('button').contains('Войти').click();

                cy.intercept('POST', '/api/auth/login').as('postLogin');

                // should wait till login request done
                cy.wait('@postLogin')
                    .its('response.statusCode')
                    .should('eq', 200);

                // after login request URL will change to main
                const baseUrl = Cypress.config('baseUrl');

                cy.url().should('eq', `${baseUrl}/`);

                // click again for order button
                cy.get('@button').click();
            }

            cy.intercept('POST', '/api/orders').as('postOrder');

            // wait till order request done
            cy.wait('@postOrder')
                .its('response.statusCode')
                .should('eq', 200);

            cy.get('#react-modals').as('modal');
            cy.get('@modal').getByTestId('order-number').invoke('text').then((text) => {
                expect(text.length).to.be.at.least(5);
            }).then(() => {
                cy.get('@modal').getByTestId('close').first().click();
            });
        });
    });
});