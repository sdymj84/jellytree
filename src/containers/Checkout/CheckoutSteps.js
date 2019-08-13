import React, { Fragment } from 'react'
import { Segment } from "semantic-ui-react";
import ShippingAddress from './ShippingAddress';
import DeliveryMethod from './DeliveryMethod'


const CheckoutSteps = () => {
  return (
    <Fragment>
      <Segment vertical padded="very">
        <ShippingAddress />
      </Segment>
      <Segment vertical padded="very">
        <DeliveryMethod />
      </Segment>
    </Fragment>
  )
}

export default CheckoutSteps
