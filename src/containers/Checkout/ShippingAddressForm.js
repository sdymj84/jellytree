import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'
import styled from 'styled-components'

const StyledForm = styled(Form)`
  margin-top: 1.5em;
`

const ShippingAddressForm = () => {
  const [forms, setForms] = useState({
    email: '',
    phone: '',
    firstName: '',
    middleName: '',
    lastName: '',
    streetName: '',
    unit: '',
    city: '',
    state: '',
    zipcode: '',
  })

  const handleChange = (e, { name, value }) => {
    setForms(forms => ({
      ...forms,
      [name]: value
    }))
  }

  const handleSubmit = () => {
    console.log("Form submitted : ", forms)
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
      <Form.Button
        content="Save"
        color="green" size="large" />
    </StyledForm>
  )
}

export default ShippingAddressForm