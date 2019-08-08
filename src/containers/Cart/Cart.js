import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'
import {
  Container, Button, Segment,
  Header, Icon
} from 'semantic-ui-react'
import { CartContext } from '../../contexts/CartContext'
import styled from 'styled-components'
import CartProduct from './CartProduct'

const isMobile = window.innerWidth < 600

const StyledContainer = styled(Container)`
  padding-left: ${isMobile && 0};
  padding-right: ${isMobile && 0};
`
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
      <StyledContainer>
        <Segment placeholder loading />
      </StyledContainer>
    )
  }

  if (cartProducts.error) {
    return (
      <StyledContainer>
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
      </StyledContainer>
    )
  }

  if (!cartProducts.length) {
    return (
      <StyledContainer>
        <Segment placeholder>
          <Header icon as='h2'>
            <Icon name="cart arrow down" />
            Your JellyTree Cart is empty
          </Header>
        </Segment>
      </StyledContainer>
    )
  }

  return (
    <StyledContainer>
      {cartProducts.length > 2 &&
        <StyledButton fluid
          size="big" color="orange"
          onClick={handleCheckout}>
          Proceed to Checkout
      </StyledButton>}
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
    </StyledContainer>
  )
}

export default withRouter(Cart)
