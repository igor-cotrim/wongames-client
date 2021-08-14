import { fireEvent, screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import GameCard from '.'

const props = {
  slug: 'population-zero',
  title: 'Population Zero',
  developer: 'Rockstar Games',
  img: 'https://source.unsplash.com/user/willianjusten/300x140',
  price: 235
}

describe('<GameCard />', () => {
  it('should render correctly', () => {
    //renderizar o GameCard
    renderWithTheme(<GameCard {...props} />)

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
    renderWithTheme(<GameCard {...props} />)

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
    renderWithTheme(<GameCard {...props} promotionalPrice={15} />)

    // preço tenha line-through (200)
    expect(screen.getByText('$235.00')).toHaveStyle({
      'text-decoration': 'line-through'
    })
    // preço novo promocional não vai ter line-through (15)
    expect(screen.getByText('$15.00')).not.toHaveStyle({
      'text-decoration': 'line-through'
    })
  })

  it('should render a filled Favorite icon when favorite is true', () => {
    renderWithTheme(<GameCard {...props} favorite />)

    expect(screen.getByLabelText(/remove from wishlist/i)).toBeInTheDocument()
  })

  it('should call onFav method when favorite is clicked', () => {
    //Criar um espiao - ficar olhando o metodo, toda vez q for chamado ele vai avisar
    const onFav = jest.fn()
    renderWithTheme(<GameCard {...props} favorite onFav={onFav} />)

    fireEvent.click(screen.getAllByRole('button')[0])

    expect(onFav).toBeCalled()
  })

  it('should render Ribbon', () => {
    renderWithTheme(
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
