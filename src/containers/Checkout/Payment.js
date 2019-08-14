import React from 'react'
import { Grid, Header } from "semantic-ui-react";
import ChangeCheckoutInfo from '../../components/ChangeCheckoutInfo'
import CheckoutStepNumber from '../../components/CheckoutStepNumber'


const Payment = () => {
  return (
    <Grid columns={3}>
      <Grid.Column width={7}>
        <Header as='h3'>
          <CheckoutStepNumber
            number='3'
            isCompleted={true} />
          Payment
        </Header>
      </Grid.Column>
      <Grid.Column width={7}>
        <div>
          <div>
            xxxx xxxx xxxx 1111
          </div>
          <div>
            <div>Billing Address : </div>
            <div>Minjun Youn</div>
            <div>14220 Conser Street, Apt 401</div>
            <div>Overland Park, Kansas 66223</div>
            <div>United States</div>
            <div>+19133536799</div>
          </div>
        </div>
      </Grid.Column>
      <Grid.Column width={2}>
        <ChangeCheckoutInfo />
      </Grid.Column>
    </Grid>
  )
}

export default Payment
