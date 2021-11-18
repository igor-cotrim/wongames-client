/// <reference path="../support/index.d.ts" />

describe('#Reset Password', () => {
  it('should show error if password does not match', () => {
    cy.visit('/reset-password?code=1234567')

    cy.findByPlaceholderText(/^password/i).type('123')
    cy.findByPlaceholderText(/confirm password/i).type('123345')
    cy.findByRole('button', { name: /reset password/i }).click()

    cy.findByText(/confirm password does not match with password/i).should('exist')
  });

  it('should show error if code not valid', () => {
    cy.intercept('POST', '**/auth/reset-password', res => {
      res.reply({
        status: 400,
        body: {
          error: 'Bad Request',
          message: [
            {
              messages: [
                {
                  message: 'Incorrect code provided'
                }
              ]
            }
          ]
        }
      })
    })

    cy.visit('/reset-password?code=wrong_code')

    cy.findByPlaceholderText(/^password/i).type('12345')
    cy.findByPlaceholderText(/confirm password/i).type('12345')
    cy.findByRole('button', { name: /reset password/i }).click()

    cy.findByText(/Incorrect code provided/i).should('exist')
  });

  it('should fill the input and redirect to the home page  with the user signed in', () => {
    // rota do nosso backend
    cy.intercept('POST', '**/auth/reset-password', {
      statusCode: 200,
      body: { user: { email: 'e2e@wongames.com' }}
    })

    //rota de session do next-auth
    cy.intercept('POST', '**/auth/callback/credentials*', {
      statusCode: 200,
      body: { user: { email: 'e2e@wongames.com' }}
    })

    //rota de session do next-auth
    cy.intercept('GET', '**/auth/session*', {
      statusCode: 200,
      body: { user: { name: 'cypress', email: 'e2e@wongames.com' }}
    })

    // usuario vai entrar na pagina de reset
    cy.visit('/reset-password?code=valid_code')

    // vai preencher as senhas (já com o token válido)
    cy.findByPlaceholderText(/^password/i).type('12345')
    cy.findByPlaceholderText(/confirm password/i).type('12345')
    cy.findByRole('button', { name: /reset password/i }).click()

    // o sign in acontece no background

    // redireciona para a home
    cy.url().should('eq', `${Cypress.config().baseUrl}/`)

    // tem o usuario logado com o name no menu
    cy.findByText(/cypress/i).should('exist')
  });
});
