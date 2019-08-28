import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'
import {
  Container, Button, Segment,
  Header, Icon
} from 'semantic-ui-react'
import { CartContext } from '../../contexts/CartContext'
import styled from 'styled-components'
import CartProduct from './CartProduct'
import theme from '../../theme'
import _ from 'lodash'
import { useStoreState } from "easy-peasy";

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
const Subtotal = styled.div`
  font-size: 1.5em;
  margin: 0 0 10px 10px;
  .price {
    color: ${theme.contrastColor};
  }
`


const Cart = (props) => {
  const cartStore = useStoreState(state =>
    state.cart.cartProducts)
  console.log(cartStore)

  const {
    dispatchCart,
    cartProducts, cartRefetch,
  } = useContext(CartContext)

  const handleCheckout = () => {
    dispatchCart({
      type: 'CLOSE_CART'
    })
    props.history.push('/checkout')
  }

  const itemCounts = cartProducts.length
  const subtotal = _.sumBy(cartProducts, product => Number(product.totalPrice))

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
            onClick={cartRefetch}>
            RETRY
          </Button>
          <Header as='h3' textAlign="center">
            Please contact customer service if the problem persists
          </Header>
        </Segment>
      </StyledContainer>
    )
  }

  if (!itemCounts) {
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
      {itemCounts > 2 &&
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
      <Subtotal>
        Subtotal ({itemCounts} items): {' '}
        <span className="price">
          {!isNaN(subtotal) && '$' + subtotal}
        </span>
      </Subtotal>
      <StyledButton fluid
        size="big" color="orange"
        onClick={handleCheckout}>
        Proceed to Checkout
      </StyledButton>
    </StyledContainer>
  )
}

export default withRouter(Cart)
