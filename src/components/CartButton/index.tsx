import {
  AddShoppingCart,
  RemoveShoppingCart
} from '@styled-icons/material-outlined'
import Button, { ButtonProps } from 'components/Button'
import { useCart } from 'hooks/use-cart'

type CartButtonProps = {
  id: string
  hasText?: boolean
} & Pick<ButtonProps, 'size'>

const CartButton = ({
  id,
  size = 'small',
  hasText = false
}: CartButtonProps) => {
  const { isInCart, addToCart, removeToCart } = useCart()
  const ButtonText = isInCart(id) ? 'Remove to cart' : 'Add to cart'

  return (
    <Button
      icon={
        isInCart(id) ? (
          <RemoveShoppingCart aria-label="Remove to cart" />
        ) : (
          <AddShoppingCart aria-label="Add to cart" />
        )
      }
      size={size}
      onClick={() => (isInCart(id) ? removeToCart(id) : addToCart(id))}
    >
      {hasText && ButtonText}
    </Button>
  )
}

export default CartButton
