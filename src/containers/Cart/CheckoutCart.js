import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import {
  Container, Button, Segment,
  Header, Icon
} from 'semantic-ui-react'
import styled from 'styled-components'
import CartProduct from './CartProduct'
import theme from '../../theme'
import _ from 'lodash'
import PlaceOrderButton from '../../components/PlaceOrderButton';
import { connect } from "react-redux";

const isMobile = window.innerWidth < 600

const StyledContainer = styled(Container)`
  padding-left: ${isMobile && 0};
  padding-right: ${isMobile && 0};
`
const OrderSummary = styled(Segment)`
  max-width: 500px;
  .summary-value {
    float: right;
  }
  .item {
    padding: 5px;
    border-bottom: 1px solid #eaeaea;
  }
`
const Subtotal = styled.div`
  font-size: 1.5em;
  margin-top: 1em;
  .price {
    color: ${theme.contrastColor};
  }
`


const Cart = (props) => {
  const { cartProducts } = props.cart

  const itemCounts = cartProducts.length

  const sumPrice = (x, y) => {
    return (Number(x) + Number(y)).toFixed(2)
  }
  const subPrice = (x, y) => {
    return (Number(x) - Number(y)).toFixed(2)
  }

  const calcOrderSummary = () => {
    const subtotal = _.sumBy(cartProducts, product => Number(product.totalPrice))
    const shippingFee = '5.00'
    const totalBeforeTax = sumPrice(subtotal, shippingFee)
    const taxPercentage = 10
    const estimatedTax = (totalBeforeTax / taxPercentage).toFixed(2)
    const total = sumPrice(totalBeforeTax, estimatedTax)
    const giftcard = '12.34'
    const orderTotal = subPrice(total, giftcard)

    return (
      <Fragment>
        <div>
          <Header as='h3'>
            Order Summary
          </Header>
          <div className="item">Items ({itemCounts}):
            <span className="summary-value">
              {!isNaN(subtotal) && '$' + subtotal}
            </span>
          </div>
          <div className="item">Shipping & handling:
            <span className="summary-value">
              ${shippingFee}
            </span>
          </div>
          <div className="item">Total before tax:
            <span className="summary-value">
              ${totalBeforeTax}
            </span>
          </div>
          <div className="item">Estimated tax to be collected:
            <span className="summary-value">
              ${estimatedTax}
            </span>
          </div>
          <div className="item">Total:
            <span className="summary-value">
              ${total}
            </span>
          </div>
          <div className="item">Gift Card:
            <span className="summary-value">
              ${giftcard}
            </span>
          </div>
        </div>
        <Subtotal>
          Order Total: {' '}
          <span className="price summary-value">
            ${orderTotal}
          </span>
        </Subtotal>
      </Fragment>
    )
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
          // onClick={cartRefetch}
          >
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
      <PlaceOrderButton />
      <OrderSummary>
        {calcOrderSummary()}
      </OrderSummary>

      <div style={{
        height: '300px',
        overflow: 'auto',
        border: `1px solid #e5e5e5`,
        borderRadius: '4px',
      }}>
        {cartProducts.map(product =>
          <CartProduct
            key={product.id}
            product={product} />
        )}
      </div>
    </StyledContainer>
  )
}



const mapStateToProps = (state) => ({
  cart: state.cart
})


export default withRouter(connect(mapStateToProps)(Cart))


