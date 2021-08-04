import { GetServerSideProps } from 'next'
import Cart, { CartProps } from 'templates/Cart'

import itemsMock from 'components/CartList/mock'
import gamesMock from 'components/GameCardSlider/mock'
import cardsMock from 'components/PaymentOptions/mock'
import highlightMock from 'components/Highlight/mock'

export default function CartePage(props: CartProps) {
  return <Cart {...props} />
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      items: itemsMock,
      total: 'R$ 430,00',
      cards: cardsMock,
      recommendedGames: gamesMock,
      recommendedHighlight: highlightMock
    }
  }
}
