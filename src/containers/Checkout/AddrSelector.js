import React, { useState, Fragment } from 'react'
import ShippingAddressForm from './ShippingAddressForm';
import {
  Segment, Header, Button,
} from "semantic-ui-react";
import AddrRadioGroup from './AddrRadioGroup'
import styled from 'styled-components'
import theme from '../../theme'
import LoaderButton from '../../components/LoaderButton';
import { setShippingAddress } from '../../actions/authAction';
import _ from 'lodash'


const Container = styled.div`
  .field {
    padding: 10px 10px 7px 10px;
    border: 1px solid white;
  }
  .address {
    font-family: Arial, Helvetica, sans-serif;
    margin-left: 10px;
  }
  .selected {
    border: 1px solid ${theme.contrastColor};
    background-color: rgba(242, 98, 2, 0.1);
    border-radius: 4px;
  }
`

const AddrSelector = ({ addresses, user, dispatchUser }) => {

  const [isLoading, setIsLoading] = useState(false)
  const handleSelectAddr = async () => {
    setIsLoading(true)
    console.log(selectedAddrId)
    await setShippingAddress(user,
      _.find(addresses, { 'id': selectedAddrId }),
      dispatchUser
    )
    setIsLoading(false)
  }

  const [selectedAddrId, setSelectedAddrId] = useState("")
  const handleAddrChange = (e, { value }) => {
    setSelectedAddrId(value)
  }

  const [isShowAddrForm, setIsShowAddrForm] = useState(false)
  const handleAddAddrClick = () => {
    setIsShowAddrForm(true)
  }

  return (
    <Segment>
      <Header as='h4'>Select Address or Add New</Header>
      <hr />
      <Container>
        {addresses.length
          ? <AddrRadioGroup
            selectedAddrId={selectedAddrId}
            handleAddrChange={handleAddrChange}
            addresses={addresses}
            isLoading={isLoading} />
          : !isShowAddrForm &&
          <div>There's no address. Please add one.</div>
        }

        {isShowAddrForm
          ? <ShippingAddressForm
            addr={addresses[0]}
            setIsShowAddrForm={setIsShowAddrForm} />
          : <Fragment>
            <hr />
            <div style={{ marginBottom: '0' }}>
              {addresses.length ?
                <LoaderButton
                  content="Use this address"
                  color="green" size="small"
                  onClick={handleSelectAddr}
                  isLoading={isLoading} /> : null}
              <Button
                content="Add Address"
                onClick={handleAddAddrClick}
                color="blue" size="small"
                icon="add" />
            </div>
          </Fragment>}
      </Container>
    </Segment>
  )
}

export default AddrSelector
