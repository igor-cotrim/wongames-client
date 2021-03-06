import '../../../.jest/session.mock'
import { render, screen } from 'utils/test-utils'

import GameCard from '.'

const props = {
  id: '1',
  slug: 'population-zero',
  title: 'Population Zero',
  developer: 'Rockstar Games',
  img: 'https://source.unsplash.com/user/willianjusten/300x140',
  price: 235
}

describe('<GameCard />', () => {
  it('should render correctly', () => {
    //renderizar o GameCard
    render(<GameCard {...props} />)

    //verificar se o title renderizado
    expect(
      screen.getByRole('heading', { name: props.title })
    ).toBeInTheDocument()
    //verificar se o developer renderizado
    expect(
      screen.getByRole('heading', { name: props.developer })
    ).toBeInTheDocument()
    //verificar se o img renderizado
    expect(screen.getByRole('img', { name: props.title })).toHaveAttribute(
      'src',
      props.img
    )

    expect(screen.getByRole('link', { name: props.title })).toHaveAttribute(
      'href',
      `/game/${props.slug}`
    )
    //verificar se o price renderizado
    expect(screen.getByLabelText(/add to wishlist/i)).toBeInTheDocument()
  })

  it('should render price in label', () => {
    // renderiza o componente
    render(<GameCard {...props} />)

    const price = screen.getByText('$235.00')

    // preço não tenha line-through
    expect(price).not.toHaveStyle({
      'text-decoration': 'line-through'
    })
    // preço tenha o background secundário
    expect(price).toHaveStyle({
      backgroundColor: '#3CD3C1'
    })
  })

  it('should render a line-through in price when promotional', () => {
    // renderiza o componente (COM promotionalPrice) // 200 reais // 15 reais
    render(<GameCard {...props} promotionalPrice={15} />)

    // preço tenha line-through (200)
    expect(screen.getByText('$235.00')).toHaveStyle({
      'text-decoration': 'line-through'
    })
    // preço novo promocional não vai ter line-through (15)
    expect(screen.getByText('$15.00')).not.toHaveStyle({
      'text-decoration': 'line-through'
    })
  })

  it('should render Ribbon', () => {
    render(
      <GameCard
        {...props}
        ribbon="my Ribbon"
        ribbonColor="secondary"
        ribbonSize="small"
      />
    )

    const ribbon = screen.getByText(/my ribbon/i)

    expect(ribbon).toHaveStyle({ backgroundColor: '#3CD3C1' })
    expect(ribbon).toHaveStyle({ height: '2.6rem', fontSize: '1.2rem' })
    expect(ribbon).toBeInTheDocument()
  })
})
