import React, { useState, useContext } from 'react'
import { Form, Button } from 'semantic-ui-react'
import styled from 'styled-components'
import { AuthContext } from '../../contexts/AuthContext';
import {
  addAddress, setShippingAddress
} from '../../actions/authAction';
import LoaderButton from '../../components/LoaderButton';

const StyledForm = styled(Form)`
  margin-top: 1.5em;
`

// TODO: data validation
const ShippingAddressForm = ({ addr, setIsShowAddrForm }) => {
  const { user, dispatchUser } = useContext(AuthContext)
  const [forms, setForms] = useState({
    email: addr ? addr.email : "",
    phone: addr ? addr.phone : "",
    firstName: addr ? addr.firstName : "",
    middleName: addr ? addr.middleName : "",
    lastName: addr ? addr.lastName : "",
    streetName: addr ? addr.streetName : "",
    unit: addr ? addr.unit : "",
    city: addr ? addr.city : "",
    state: addr ? addr.state : "",
    zipcode: addr ? addr.zipcode : "",
  })

  const handleChange = (e, { name, value }) => {
    setForms(forms => ({
      ...forms,
      [name]: value
    }))
  }

  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async () => {
    setIsLoading(true)
    const newUser = await addAddress(user, forms, dispatchUser)
    await setShippingAddress(newUser, forms, dispatchUser)
    setIsLoading(false)
  }

  const handleCancelClick = (e) => {
    e.preventDefault()
    setIsShowAddrForm(false)
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Input
          label='Email for order confirmation' width={10}
          name='email' value={forms.email}
          onChange={handleChange} />
        <Form.Input
          label='Phone Number' width={6}
          name='phone' value={forms.phone}
          onChange={handleChange} />
      </Form.Group>
      <Form.Group>
        <Form.Input label='First Name' width={6}
          name='firstName' value={forms.firstName}
          onChange={handleChange} />
        <Form.Input label='Middle Name' width={4}
          name='middleName' value={forms.middleName}
          onChange={handleChange} />
        <Form.Input label='Last Name' width={6}
          name='lastName' value={forms.lastName}
          onChange={handleChange} />
      </Form.Group>
      <Form.Group>
        <Form.Input label='Street Name' width={12}
          name='streetName' value={forms.streetName}
          onChange={handleChange} />
        <Form.Input label='Unit/Apt #' width={4}
          name='unit' value={forms.unit}
          onChange={handleChange} />
      </Form.Group>
      <Form.Group>
        <Form.Input label='City' width={7}
          name='city' value={forms.city}
          onChange={handleChange} />
        <Form.Input label='State' width={5}
          name='state' value={forms.state}
          onChange={handleChange} />
        <Form.Input label='Zipcode' width={4}
          name='zipcode' value={forms.zipcode}
          onChange={handleChange} />
      </Form.Group>
      <Form.Group>
        <LoaderButton
          style={{ marginLeft: '7px' }}
          content="Save"
          isLoading={isLoading}
          color="green" size="small" />
        {!isLoading && <Button
          content="Cancel"
          color="orange" size="small"
          onClick={handleCancelClick} />}
      </Form.Group>
    </StyledForm>
  )
}

export default ShippingAddressForm
