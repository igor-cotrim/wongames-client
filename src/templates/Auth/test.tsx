import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import Auth from '.'

describe('<Auth />', () => {
  it('should render all componentes and children', () => {
    renderWithTheme(
      <Auth title="Auth Title">
        <input type="text" />
      </Auth>
    )

    //verificar se tem 2 logos
    expect(screen.getAllByRole('img', { name: /won games/i })).toHaveLength(2)

    //verificar se tem o heading principal do banner
    expect(
      screen.getByRole('heading', {
        name: /All your favorite games in one place/i
      })
    ).toBeInTheDocument()

    //verificar se tem o subtitle
    expect(
      screen.getByRole('heading', {
        name: /WON is the best and most complete gaming platform/i
      })
    ).toBeInTheDocument()

    //verificar se tem o title do content
    expect(
      screen.getByRole('heading', {
        name: /auth title/i
      })
    ).toBeInTheDocument()

    //verificar se o children ta sendo renderizado
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })
})
