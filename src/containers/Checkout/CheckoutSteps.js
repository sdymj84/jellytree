import React, { Fragment } from 'react'
import { Segment } from "semantic-ui-react";
import ShippingAddress from './ShippingAddress';
import DeliveryMethod from './DeliveryMethod'
import Payment from './Payment';
import ReviewAndOrder from './ReviewAndOrder'


const CheckoutSteps = (props) => {
  return (
    <Fragment>
      <Segment vertical padded="very">
        <ShippingAddress />
      </Segment>
      <Segment vertical padded="very">
        <DeliveryMethod />
      </Segment>
      <Segment vertical padded="very">
        <Payment />
      </Segment>
      <Segment vertical padded="very"
        style={{ borderBottom: 'none' }}>
        <ReviewAndOrder orderTotal={props.orderTotal} />
      </Segment>
    </Fragment>
  )
}

export default CheckoutSteps
