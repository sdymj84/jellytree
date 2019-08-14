import React, { Fragment } from 'react'
import { Grid, Header } from "semantic-ui-react";
import ChangeCheckoutInfo from '../../components/ChangeCheckoutInfo'
import CheckoutStepNumber from '../../components/CheckoutStepNumber'
import ShippingAddressForm from './ShippingAddressForm';


const ShippingAddress = () => {
  return (
    <Fragment>
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

        </Grid.Column>
        <Grid.Column width={2}>
          <ChangeCheckoutInfo />
        </Grid.Column>
      </Grid>
      <ShippingAddressForm />
    </Fragment>
  )
}

export default ShippingAddress
