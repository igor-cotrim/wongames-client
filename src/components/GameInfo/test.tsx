import { render, screen } from 'utils/test-utils'

import GameInfo from '.'

const props = {
  title: 'My Game Title',
  description: 'Game Description',
  price: 210
}

describe('<GameInfo />', () => {
  it('should render game informations', () => {
    render(<GameInfo {...props} />)

    //esperar por um heading (title)
    expect(
      screen.getByRole('heading', { name: /my game title/i })
    ).toBeInTheDocument()
    //esperar por description
    expect(screen.getByText(/Game Description/i)).toBeInTheDocument()
    //esperar por price
    expect(screen.getByText(/\$210\.00/i)).toBeInTheDocument()
  })

  it('should render buttons', () => {
    render(<GameInfo {...props} />)

    //esperar button add to cart
    expect(
      screen.getByRole('button', { name: /add to cart/i })
    ).toBeInTheDocument()
    //esperar button wishlist
    expect(
      screen.getByRole('button', { name: /wishlist/i })
    ).toBeInTheDocument()
  })
})
