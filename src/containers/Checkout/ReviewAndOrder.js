import React from 'react'
import { Grid, Header } from "semantic-ui-react";
import CheckoutStepNumber from '../../components/CheckoutStepNumber'
import PlaceOrderButton from '../../components/PlaceOrderButton';


const ReviewAndOrder = () => {
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
          <PlaceOrderButton />
        </div>
      </Grid.Column>
    </Grid>
  )
}

export default ReviewAndOrder
