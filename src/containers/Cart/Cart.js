import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'
import {
  Container, Button, Segment,
  Header, Icon
} from 'semantic-ui-react'
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

const Cart = (props) => {
  const { cartProducts, refetch, dispatchCart } = useContext(CartContext)
  const handleCheckout = () => {
    dispatchCart({
      type: 'CLOSE_CART'
    })
    props.history.push('/checkout')
  }
  if (cartProducts.loading) {
    return (
      <Container>
        <Segment placeholder loading />
      </Container>
    )
  }

  if (cartProducts.error) {
    return (
      <Container>
        <Segment placeholder>
          <Header icon as='h2'>
            <Icon name="warning circle" />
            Something went wrong
          </Header>
          <Button
            color="olive"
            onClick={refetch}>
            RETRY
          </Button>
          <Header as='h3' textAlign="center">
            Please contact customer service if the problem persists
          </Header>
        </Segment>
      </Container>
    )
  }

  if (!cartProducts.length) {
    return (
      <Container>
        <Segment placeholder>
          <Header icon as='h2'>
            <Icon name="cart arrow down" />
            Your JellyTree Cart is empty
          </Header>
        </Segment>
      </Container>
    )
  }

  return (
    <Container>
      {cartProducts.map(product =>
        <CartProduct
          key={product.id}
          product={product} />
      )}
      <StyledButton fluid
        size="big" color="orange"
        onClick={handleCheckout}>
        Proceed to Checkout
      </StyledButton>
    </Container>
  )
}

export default withRouter(Cart)