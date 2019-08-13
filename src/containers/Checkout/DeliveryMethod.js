import React from 'react'
import { Grid, Header } from "semantic-ui-react";
import ChangeCheckoutInfo from '../../components/ChangeCheckoutInfo'
import CheckoutStepNumber from '../../components/CheckoutStepNumber'


const DeliveryMethod = () => {
  return (
    <Grid columns={3}>
      <Grid.Column width={7}>
        <Header as='h3'>
          <CheckoutStepNumber
            number='2'
            isCompleted={true} />
          Delivery Method
        </Header>
      </Grid.Column>
      <Grid.Column width={7}>
        <div>
          Free Shipping
        </div>
      </Grid.Column>
      <Grid.Column width={2}>
        <ChangeCheckoutInfo />
      </Grid.Column>
    </Grid>
  )
}

export default DeliveryMethod
