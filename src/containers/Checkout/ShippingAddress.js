import React, { Fragment, useContext, useState, useEffect } from 'react'
import { Grid, Header } from "semantic-ui-react";
import ChangeCheckoutInfo from '../../components/ChangeCheckoutInfo'
import CheckoutStepNumber from '../../components/CheckoutStepNumber'
import { AuthContext } from '../../contexts/AuthContext';
import AddrSelector from './AddrSelector';
import _ from 'lodash'
import styled from 'styled-components'


const isMobile = window.innerWidth < 600

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

const ShippingAddress = () => {
  const { user, dispatchUser } = useContext(AuthContext)
  const [addr, setAddr] = useState(user.shippingAddress)

  useEffect(() => {
    setAddr(user.shippingAddress)
  }, [user])

  const [isAddrSelectorMode, setIsAddrSelectorMode] = useState(
    () => _.isEmpty(addr) ? true : false
  )

  const handleChange = () => {
    setIsAddrSelectorMode(!isAddrSelectorMode)
  }

  if (!user || !user.addresses) { return null }


  const mRender = (
    <Fragment>
      <Flex>
        <Header as='h3'>
          <CheckoutStepNumber
            number='1'
            isCompleted={addr} />
          Shipping Address
        </Header>

        {user.addresses.length ?
          <ChangeCheckoutInfo
            isAddrSelectorMode={isAddrSelectorMode}
            visible={addr}
            handleChange={handleChange} /> : null}
      </Flex>


      {!isAddrSelectorMode &&
        <div>
          <div>{addr.firstName + ' ' + addr.middleName + ' ' + addr.lastName}</div>
          <div>{addr.email}</div>
          <div>{`${addr.streetName}, Unit/Apt# ${addr.unit}`}</div>
          <div>{`${addr.city}, ${addr.state} ${addr.zipcode}`}</div>
          <div>United States</div>
          <div>{addr.phone}</div>
        </div>}

      {isAddrSelectorMode &&
        <AddrSelector
          user={user}
          setIsAddrSelectorMode={setIsAddrSelectorMode}
          dispatchUser={dispatchUser}
          addresses={user.addresses} />}
    </Fragment>
  )

  const render = (
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
          {!isAddrSelectorMode &&
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
          {user.addresses.length ?
            <ChangeCheckoutInfo
              isAddrSelectorMode={isAddrSelectorMode}
              visible={addr}
              handleChange={handleChange} /> : null}
        </Grid.Column>
      </Grid>
      {
        isAddrSelectorMode &&
        <AddrSelector
          user={user}
          setIsAddrSelectorMode={setIsAddrSelectorMode}
          dispatchUser={dispatchUser}
          addresses={user.addresses} />
      }
    </Fragment>
  )

  return (
    isMobile ? mRender : render
  )
}

export default ShippingAddress
