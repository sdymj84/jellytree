import React, { useState, Fragment } from 'react'
import ShippingAddressForm from './ShippingAddressForm';
import {
  Segment, Header, Button, Message, Icon,
} from "semantic-ui-react";
import AddrRadioGroup from './AddrRadioGroup'
import styled from 'styled-components'
import theme from '../../theme'
import LoaderButton from '../../components/LoaderButton';
import { setShippingAddress } from '../../actions/authAction';
import _ from 'lodash'


const Container = styled.div`
  .selected {
    border: 1px solid ${theme.contrastColor};
    background-color: rgba(242, 98, 2, 0.1);
    border-radius: 4px;
  }
`

const AddrSelector = ({ addresses, user, dispatchUser, setIsAddrSelectorMode }) => {
  const [isLoading, setIsLoading] = useState(false)
  const handleSelectAddr = async () => {
    setIsLoading(true)
    await setShippingAddress(user, selectedAddrId, dispatchUser)
    setIsLoading(false)
    setIsAddrSelectorMode(false)
  }

  const [selectedAddrId, setSelectedAddrId] = useState(user.shippingAddress.id)
  const handleAddrChange = (e, { value }) => {
    setSelectedAddrId(value)
  }

  const [isShowAddrForm, setIsShowAddrForm] = useState(false)
  const handleAddAddrClick = () => {
    setIsShowAddrForm(true)
    setIsEdit(false)
  }

  const [isEdit, setIsEdit] = useState(false)
  const handleEdit = (id) => {
    setSelectedAddrId(id)
    setIsShowAddrForm(true)
    setIsEdit(true)
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
            handleEdit={handleEdit}
            addresses={addresses}
            isLoading={isLoading} />
          : !isShowAddrForm &&
          <div>There's no address. Please add one.</div>
        }

        {isShowAddrForm
          ? isEdit
            ? <ShippingAddressForm
              isEdit={isEdit}
              addr={_.find(addresses, { 'id': selectedAddrId })}
              setIsShowAddrForm={setIsShowAddrForm} />
            : <ShippingAddressForm
              isEdit={isEdit}
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
      {addresses.length
        ? <Message info>
          <Icon name="info circle" />
          Select one of the addresses you want to use for the shipping address, and press "Use this address" button
    </Message> : null}
    </Segment>
  )
}

export default AddrSelector
