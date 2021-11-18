/// <reference path="../support/index.d.ts" />

describe('#Cart', () => {
  it('should add and remove items from cart', () => {
    cy.visit('/')

    cy.addToCartByIndex(0)
    cy.addToCartByIndex(1)
    cy.addToCartByIndex(2)

    cy.findAllByLabelText(/cart items/i)
      .first()
      .should('have.text', 3)
      .click()

    cy.getByDataCy('cart-list').within(() => {
      cy.findAllByRole('heading').should('have.length', 3)
    })

    cy.findAllByLabelText(/cart items/i)
    .first()
    .click()

    cy.removeToCartByIndex(0)
    cy.removeToCartByIndex(1)
    cy.removeToCartByIndex(2)

    cy.findAllByLabelText(/cart items/i).should('not.exist')

    cy.findAllByLabelText(/shopping cart/i).first().click()

    cy.getByDataCy('cart-list').within(() => {
      cy.findAllByRole('heading', { name: 'Your cart is empty' }).should('exist')
    })
  });
});
