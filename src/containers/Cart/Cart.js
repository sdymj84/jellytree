import React, { useContext } from 'react'
import { Container, Button } from 'semantic-ui-react'
import { CartContext } from '../../contexts/CartContext'
import styled from 'styled-components'
import CartProduct from './CartProduct'

const StyledButton = styled(Button)`
  &&& {
    box-shadow: 0 0 15px -4px grey;
    margin-bottom: 3em;
    max-width: 500px;
  }
`


const Cart = () => {
  const { productsInCart } = useContext(CartContext)
  return (
    <Container>
      {productsInCart.map(product =>
        <CartProduct
          key={product.id}
          product={product} />
      )}
      <StyledButton fluid
        size="big" color="orange">
        Proceed to Checkout
      </StyledButton>
    </Container>
  )
}

export default Cart
