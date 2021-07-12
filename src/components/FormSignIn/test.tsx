import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import FormSignIn from '.'

describe('<FormSignIn />', () => {
  it('should render the form', () => {
    renderWithTheme(<FormSignIn />)

    //vefirificar email
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    //verificar password
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument()
    //verificar button
    expect(
      screen.getByRole('button', { name: /sign in now/i })
    ).toBeInTheDocument()
  })

  it('should render the forgot password link', () => {
    renderWithTheme(<FormSignIn />)

    expect(
      screen.getByRole('link', { name: /forgot your password\?/i })
    ).toBeInTheDocument()
  })

  it('should render the text to sign up', () => {
    renderWithTheme(<FormSignIn />)

    //text
    expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument()
    //link
    expect(screen.getByText(/don´t have an account\?/i)).toBeInTheDocument()
  })
})
