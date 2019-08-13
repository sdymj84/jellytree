import React from 'react'
import { Grid, Header } from "semantic-ui-react";
import ChangeCheckoutInfo from '../../components/ChangeCheckoutInfo'
import CheckoutStepNumber from '../../components/CheckoutStepNumber'


const ShippingAddress = () => {
  return (
    <Grid columns={3}>
      <Grid.Column width={7}>
        <Header as='h3'>
          <CheckoutStepNumber
            number='1'
            isCompleted={true} />
          Shipping Address
        </Header>
      </Grid.Column>
      <Grid.Column width={7}>
        <div>
          <div>Minjun Youn</div>
          <div>sdymj84@gmail.com</div>
          <div>14220 Conser Street, Apt 401</div>
          <div>Overland Park, Kansas 66223</div>
          <div>United States</div>
          <div>+19133536799</div>
        </div>
      </Grid.Column>
      <Grid.Column width={2}>
        <ChangeCheckoutInfo />
      </Grid.Column>
    </Grid>
  )
}

export default ShippingAddress
