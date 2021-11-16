
/// <reference path="../support/index.d.ts" />

describe('#Game Page', () => {
  before(() => {
    cy.visit('/game/tandem-a-tale-of-shadows')
  })

  it('should render game page sections', () => {
    cy.getByDataCy('game-info').within(() => {
      cy.findByRole('heading', { name: /Tandem: A Tale of Shadows/i }).should('exist')
      cy.findByText(/^Tandem : A Tale of Shadows redefines the puzzle platformer/i).should('exist')
      cy.findByText('$69.99').should('exist')
      cy.findByRole('button', { name: /add to cart/i }).should('exist')
    })

    // gallery
    cy.findAllByRole('button', { name: /thumb \-/i }).should('have.length.gt', 0)

    // content
    cy.getByDataCy('content').within(() => {
      cy.findByRole('heading', { name: /description/i }).should('exist')
    })

    cy.getByDataCy('content').children().should('have.length.at.least', 2)

    // Details
    cy.getByDataCy('game-details').within(() => {
      cy.findByRole('heading', { name: /game details/i }).should('exist')
      cy.findByRole('heading', { name: /developer/i }).should('exist')
      cy.findByRole('heading', { name: /release date/i }).should('exist')
      cy.findByRole('heading', { name: /platforms/i }).should('exist')
      cy.findByRole('heading', { name: /publisher/i }).should('exist')
      cy.findByRole('heading', { name: /rating/i }).should('exist')
      cy.findByRole('heading', { name: /genres/i }).should('exist')

      cy.findAllByText(/Monochrome Paris/i).should('exist')
      cy.findByText(/Oct 19, 2021/i).should('exist')
      cy.findByRole('img', { name: /windows/i }).should('exist')
      cy.findAllByText(/Hatinh Interactive/i).should('exist')
      cy.findByText(/free/i).should('exist')
      cy.findByText('Adventure / Platformer / Puzzle').should('exist')
    })

    // cy.shouldRenderShowcase({ name: "Upcoming Games", highlight: true})
    // cy.shouldRenderShowcase({ name: "You may like these games", highlight: false})
  });

  it('should add/remove game in cart', () => {
    // add to cart
    cy.getByDataCy('game-info').within(() => {
      cy.findByRole('button', { name: /add to cart/i }).click()
      cy.findByRole('button', { name: /remove to cart/i }).should('exist')
    })

    cy.findAllByLabelText(/Cart Items/i)
    .first()
    .should('have.text', 1)
    .click()

    cy.getByDataCy('cart-list').within(() => {
      cy.findByRole('heading', { name: /Tandem: A Tale of Shadows/i }).should('exist')
    })

    // close dropdown
    cy.findAllByLabelText(/cart items/i)
      .first()
      .click()

    //remove to cart
    cy.getByDataCy('game-info').within(() => {
      cy.findByRole('button', { name: /remove to cart/i }).click()
      cy.findByRole('button', { name: /add to cart/i }).should('exist')
    })

    cy.findAllByLabelText(/cart items/i).should('not.exist')
  });
});
