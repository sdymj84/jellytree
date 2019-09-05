import React from 'react'
import { Grid, Header } from "semantic-ui-react";
import CheckoutStepNumber from '../../components/CheckoutStepNumber'
import PlaceOrderButton from '../../components/PlaceOrderButton';
import { connect } from "react-redux";


const ReviewAndOrder = ({ cart }) => {
  const { cartProducts } = cart
  return (
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
}


const mapStateToProps = (state) => ({
  cart: state.cart
})

export default connect(mapStateToProps)(ReviewAndOrder)
