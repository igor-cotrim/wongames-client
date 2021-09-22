import { FavoriteBorder } from '@styled-icons/material-outlined'

import Heading from 'components/Heading'
import Ribbon from 'components/Ribbon'
import Button from 'components/Button'

import * as S from './styles'
import formatPrice from 'utils/format-price'
import CartButton from 'components/CartButton'

export type GameInfoProps = {
  id: string
  title: string
  description: string
  price: number
}

const GameInfo = ({ description, price, title, id }: GameInfoProps) => (
  <S.Wrapper>
    <Heading color="black" lineBottom>
      {title}
    </Heading>

    <Ribbon color="secondary">{formatPrice(price)}</Ribbon>

    <S.Description>{description}</S.Description>

    <S.ButtonsWrapper>
      <CartButton id={id} size="large" hasText />
      <Button icon={<FavoriteBorder />} size="large" minimal>
        Wishlist
      </Button>
    </S.ButtonsWrapper>
  </S.Wrapper>
)

export default GameInfo
