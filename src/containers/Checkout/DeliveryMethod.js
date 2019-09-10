import React, { Fragment } from 'react'
import { Grid, Header } from "semantic-ui-react";
import ChangeCheckoutInfo from '../../components/ChangeCheckoutInfo'
import CheckoutStepNumber from '../../components/CheckoutStepNumber'


const isMobile = window.innerWidth < 600

const DeliveryMethod = () => {

  const mRender = (
    <Fragment>
      <Header as='h3'>
        <CheckoutStepNumber
          number='2'
          isCompleted={true} />
        Delivery Method
        </Header>
      <ChangeCheckoutInfo />

      <div>
        Free Shipping
      </div>
    </Fragment>
  )

  const render = (
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

  return (
    isMobile ? mRender : render
  )
}

export default DeliveryMethod
