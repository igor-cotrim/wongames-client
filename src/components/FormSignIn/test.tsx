import { render, screen } from 'utils/test-utils'

import FormSignIn from '.'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter')
const push = jest.fn()

useRouter.mockImplementation(() => ({
  push,
  query: '',
  asPath: '',
  route: '/'
}))

describe('<FormSignIn />', () => {
  it('should render the form', () => {
    const { container } = render(<FormSignIn />)

    //vefirificar email
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    //verificar password
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument()
    //verificar button
    expect(
      screen.getByRole('button', { name: /sign in now/i })
    ).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render the forgot password link', () => {
    render(<FormSignIn />)

    expect(
      screen.getByRole('link', { name: /forgot your password\?/i })
    ).toBeInTheDocument()
  })

  it('should render the text to sign up', () => {
    render(<FormSignIn />)

    //text
    expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument()
    //link
    expect(screen.getByText(/don´t have an account\?/i)).toBeInTheDocument()
  })
})
