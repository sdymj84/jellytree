import React, { useState, useContext } from 'react'
import { Radio, Form } from 'semantic-ui-react'
import styled from 'styled-components'
import CheckModal from '../../components/CheckModal'
import { removeAddress } from '../../actions/authAction'
import { AuthContext } from '../../contexts/AuthContext'


const Div = styled.div`
  .field {
    padding: 10px 10px 7px 10px;
    border: 1px solid white;
  }
  .address {
    font-family: Arial, Helvetica, sans-serif;
    margin-left: 10px;
    cursor: pointer;
  }
  .edit, .remove {
    color: blue;
    text-decoration: underline;
    margin-left: 5px;
    cursor: pointer;
  }
  .edit {
    margin-left: 10px;
  }
`


const AddrRadioGroup = ({
  addresses, isLoading, handleAddrChange,
  selectedAddrId, handleEdit }) => {

  const { user, dispatchUser } = useContext(AuthContext)

  const [modal, setModal] = useState({
    modalShow: false,
    iconName: '',
    message: '',
  })
  const [selectedId, setSelectedId] = useState("")

  const handleClose = () => {
    setModal({ ...modal, modalShow: false })
  }

  const handleRemove = (id) => {
    setSelectedId(id)
    setModal({
      modalShow: true,
      iconName: 'warning',
      message: 'Are you sure to remove this address?'
    })
  }
  const handleConfirmRemove = () => {
    // Call the action for address removal
    removeAddress(user, selectedId, dispatchUser)
    handleClose()
  }

  return (
    <Div>
      <Form>
        {addresses.map(addr =>
          <Form.Field key={addr.id}
            style={{ marginBottom: '0' }}
            className={selectedAddrId === addr.id
              ? 'selected' : ''}>
            <Radio
              name="addrSelector"
              label={addr.firstName + ' ' +
                addr.middleName + ' ' +
                addr.lastName}
              checked={selectedAddrId === addr.id}
              onChange={handleAddrChange}
              value={addr.id}>
            </Radio>
            <span
              onClick={() => handleAddrChange(null, { value: addr.id })}
              className="address">
              {addr.streetName + ', ' +
                'Unit/Apt#' +
                addr.unit + ', ' +
                addr.city + ', ' +
                addr.state + ' ' +
                addr.zipcode}
            </span>
            <span className="edit"
              onClick={() => handleEdit(addr.id)}>Edit</span>
            <span className="remove"
              onClick={() => handleRemove(addr.id)}>Remove</span>
          </Form.Field>
        )}
      </Form>

      <CheckModal
        modal={modal}
        handleClose={handleClose}
        handleConfirm={handleConfirmRemove} />
    </Div>
  )
}

export default AddrRadioGroup
