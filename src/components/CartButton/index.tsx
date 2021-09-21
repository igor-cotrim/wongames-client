import {
  AddShoppingCart,
  RemoveShoppingCart
} from '@styled-icons/material-outlined'
import Button from 'components/Button'
import { useCart } from 'hooks/use-cart'

type CartButtonProps = {
  id: string
}

const CartButton = ({ id }: CartButtonProps) => {
  const { isInCart, addToCart, removeToCart } = useCart()

  return (
    <Button
      icon={
        isInCart(id) ? (
          <RemoveShoppingCart aria-label="Remove to cart" />
        ) : (
          <AddShoppingCart aria-label="Add to cart" />
        )
      }
      size="small"
      onClick={() => (isInCart(id) ? removeToCart(id) : addToCart(id))}
    />
  )
}

export default CartButton
