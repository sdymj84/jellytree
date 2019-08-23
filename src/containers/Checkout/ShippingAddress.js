import React, { Fragment, useContext, useState, useEffect } from 'react'
import { Grid, Header } from "semantic-ui-react";
import ChangeCheckoutInfo from '../../components/ChangeCheckoutInfo'
import CheckoutStepNumber from '../../components/CheckoutStepNumber'
import ShippingAddressForm from './ShippingAddressForm';
import { AuthContext } from '../../contexts/AuthContext';


const ShippingAddress = () => {
  const { user } = useContext(AuthContext)
  const [addr, setAddr] = useState(
    user.addresses.length
      ? user.addresses[0] : ""
  )
  useEffect(() => {
    setAddr(user.addresses.length
      ? user.addresses[0] : "")
  }, [user])

  const [isEditMode, setIsEditMode] = useState(
    addr ? false : true
  )
  useEffect(() => {
    setIsEditMode(addr ? false : true)
  }, [addr])

  const handleChange = () => {
    setIsEditMode(!isEditMode)
  }

  return (
    <Fragment>
      <Grid columns={3}>
        <Grid.Column width={7}>
          <Header as='h3'>
            <CheckoutStepNumber
              number='1'
              isCompleted={addr} />
            Shipping Address
        </Header>
        </Grid.Column>
        <Grid.Column width={7}>
          {!isEditMode &&
            <div>
              <div>{addr.firstName + ' ' + addr.middleName + ' ' + addr.lastName}</div>
              <div>{addr.email}</div>
              <div>{`${addr.streetName}, Unit/Apt# ${addr.unit}`}</div>
              <div>{`${addr.city}, ${addr.state} ${addr.zipcode}`}</div>
              <div>United States</div>
              <div>{addr.phone}</div>
            </div>}
        </Grid.Column>
        <Grid.Column width={2}>
          {addr &&
            <ChangeCheckoutInfo
              isEditMode={isEditMode}
              handleChange={handleChange} />}
        </Grid.Column>
      </Grid>
      {isEditMode &&
        <ShippingAddressForm addr={addr} />}
    </Fragment>
  )
}

export default ShippingAddress
