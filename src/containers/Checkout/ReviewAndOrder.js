import React, { Fragment } from 'react'
import { Grid, Header } from "semantic-ui-react";
import CheckoutStepNumber from '../../components/CheckoutStepNumber'
import PlaceOrderButton from '../../components/PlaceOrderButton';
import { connect } from "react-redux";


const isMobile = window.innerWidth < 600

const ReviewAndOrder = ({ cart }) => {
  const { cartProducts } = cart


  const mRender = (
    <Fragment>
      <Header as='h3'>
        <CheckoutStepNumber
          number='4'
          isCompleted={true} />
        Review & Place Order
        </Header>

      <div>
        Please review the order details above, and when you're ready, click Place Your Order.
        </div>
      <div style={{ marginTop: '4em' }}>
        {cartProducts.length
          ? <PlaceOrderButton /> : null}
      </div>
    </Fragment>
  )

  const render = (
    <Grid columns={2}>
      <Grid.Column width={7}>
        <Header as='h3'>
          <CheckoutStepNumber
            number='4'
            isCompleted={true} />
          Review & Place Order
        </Header>
      </Grid.Column>
      <Grid.Column width={9}>
        <div>
          Please review the order details above, and when you're ready, click Place Your Order.
        </div>
        <div style={{ marginTop: '4em' }}>
          {cartProducts.length
            ? <PlaceOrderButton /> : null}
        </div>
      </Grid.Column>
    </Grid>
  )

  return isMobile ? mRender : render
}


const mapStateToProps = (state) => ({
  cart: state.cart
})

export default connect(mapStateToProps)(ReviewAndOrder)
